const queries = require("./OracleQueries");
const {
  Sequelize,
  sequelize,
  price_list_headers,
  price_list_electrode,
  price_list_wires_and_flux,
  price_list_hypertherm,
  price_list_spares,
  price_list_egp,
} = require("../models");
const XLSX = require("xlsx");
const path = require("path");
const { QueryTypes, Op } = require("sequelize");

const chunking = async (model_name, index_height, table_height) => {
  let _final_data = [];
  let index_data = [];

  const unique_item_code = await model_name.findAll({
    attributes: [
      [
        Sequelize.fn("DISTINCT", Sequelize.col("description_1")),
        "description_1",
      ],
      "index_order",
    ],
    order: [[Sequelize.literal("index_order"), "ASC"]],
  });

  await Promise.all(
    unique_item_code.map(async (obj) => {
      const { description_1 } = obj;
      const data = await model_name.findAndCountAll({
        where: {
          description_1: description_1,
        },
        order: [[Sequelize.literal("item_code_index"), "ASC"]],
      });

      const _data = [
        ...Array(Number(Math.ceil(data?.rows?.length / table_height))).keys(),
      ].map((x, i) => {
        return x;
      });

      _data.map((x, i) => {
        const at = data?.rows?.slice(table_height * i, table_height * (i + 1));
        index_data.push(description_1);
        return _final_data.push({
          attributes: description_1,
          data_count: at.length,
          data: at,
          description_2: [
            ...new Set(
              at.map((o) => {
                return o["description_2"];
              })
            ),
          ],
        });
      });
    })
  );

  let index_val = [];
  let current_val = "";
  let prev_val = "";
  let occurance = 0;
  const dodo = _final_data.map((v, i) => {
    current_val = v.attributes;
    if (current_val === prev_val) {
      occurance++;
    } else {
      index_val.push({
        attr: v.attributes,
        ind: i + 1,
        occurance,
      });
      prev_val = v.attributes;
      occurance = 0;
      return v.attributes;
    }
  });

  const dodo_data = [
    ...Array(Number(Math.ceil(dodo?.length / index_height))).keys(),
  ].map((x, i) => {
    return x;
  });

  const pinky = dodo_data.map((x, i) => {
    const at = index_val?.slice(index_height * i, index_height * (i + 1));
    return at;
  });

  return { pinky, _final_data, index_val };
};

const chunking_egp = async (model_name = price_list_egp, index_height, table_height) => {
  try {
    const distict_index_classification = await sequelize.query(`select distinct description_1,index_order from price_list_egp order by index_order`, { type: QueryTypes.SELECT });
    let distict_product_classification = []
    let obj = []

    await Promise.all(distict_index_classification.map(async (x) => {
      distict_product_classification = await sequelize.query(`select distinct description_2 ,description_3 val,index_order,product_classification_index from price_list_egp ple where description_1 ='${x['description_1']}' order by index_order,product_classification_index`, { type: QueryTypes.SELECT });
      await Promise.all(distict_product_classification.map(async (y) => {
        const data_of_F_item_code = await sequelize.query(`select * from price_list_egp ple where description_3 ='${y['val']}' and description_1 ='${x['description_1']}' and item_code like '%F%' order by item_code_index `, { type: QueryTypes.SELECT });
        const data_of_S_item_code = await sequelize.query(`select * from price_list_egp ple where description_3 ='${y['val']}' and description_1 ='${x['description_1']}' and item_code like '%S%' order by optional_item_index`, { type: QueryTypes.SELECT });
        obj.push({
          index_classifications: x['description_1'],
          parent_classfications: y['description_2'],
          product_classifications: y['val'],
          optional_classification: data_of_S_item_code[0]?.['optional_classification'],
          F: data_of_F_item_code,
          S: data_of_S_item_code,
          total: data_of_F_item_code.length + data_of_S_item_code.length,
        })
      }))
    }))

    const flattenedData = obj.flat();

    
    const groupedData = flattenedData.reduce((acc, item) => {
      const key = item.index_classifications;
      if (!acc[key]) {
        acc[key] = [];
      }
      acc[key].push(item);
      return acc;
    }, {});

    
    const maxTotal = 10;
    const result = {};

    for (const [classification, items] of Object.entries(groupedData)) {
      let currentGroup = [];
      let currentTotal = 0;
      result[classification] = [];

      for (const item of items) {    
        if (currentTotal + item.total > maxTotal) {
          result[classification].push(currentGroup);
          currentGroup = [];
          currentTotal = 0;
        }

        currentGroup.push(item);
        currentTotal += item.total;
      }
      if (currentGroup.length > 0) {
        result[classification].push(currentGroup);
      }
    }
    let page_no=0
    const index = Object.entries(result).map((x, y) => {
      let occurance = x[1].length
      page_no = occurance+page_no
      return ({ attr: x[0], occurance:x[1].length,page_no});
    })

    let final_result=[]
    Object.entries(result).map(y => {
      if (Number(y[1].length) <= 1) {
        final_result.push({ attributes:y[0],val:y[1].flat()})
    }
      else {
        y[1].map(z => {
          final_result.push({ attributes: y[0], val:z});
        })
      }
    })

    return {_final_data:final_result,index}
  } catch (error) {
    console.log(error);
  }
};

exports.getData = async (req, res) => {
  const { pname } = req.body;
  try {
    const val = (await price_list_headers.findOne({ where: { id: pname } }))[
      "pricelist_headers_model_name"
    ];
    if (val !== "price_list_egp") {

      const model_name = require("../models")[val];

      const data = await sequelize.query(
        `SELECT column_name FROM information_schema.columns WHERE table_name = '${val}' and column_name not in ('id','item_code_index','createdAt','updatedAt','description_1','description_2','description_3','index_order'); `,
        { type: QueryTypes.SELECT }
      );

      const obj = data.map((v) => {
        return v.column_name;
      });

      const { pinky, _final_data } = await chunking(
        model_name,
        (index_height = 27),
        (table_height = 30)
      );

      res.json({
        rows: "data.rows",
        _final_data,
        index: pinky,
        body: obj,
      });
    }
    else {
      try {
        const { _final_data,index } = await chunking_egp()
        res.json({
          _final_data, index: [index]
        })
      } catch (error) {
        console.log("error in egp", error);
      }
    }
  } catch (error) {
    console.log(error);
    res.json({ error: JSON.stringify(error) });
  }
};

exports.insert_into_pricelist_headers = async (req, res) => {
  const {
    pricelist_reference_no,
    pricelist_reference_date,
    pricelist_description,
  } = req.body;
  try {
    const data = await price_list_headers.create({
      pricelist_reference_no,
      pricelist_reference_date,
      pricelist_description,
    });
    res.status(200).json({ data });
  } catch (error) {
    console.log("error in insert_into_pricelist_headers", error);
  }
};

exports.get_pricelist_headers = async (req, res) => {
  try {
    const { pname } = req.body;
    const val = await price_list_headers.findOne({
      where: {
        id: pname,
      },
    });
    res.status(200).json(val);
  } catch (error) {
    res.status(400).json({ error: error });
  }
};