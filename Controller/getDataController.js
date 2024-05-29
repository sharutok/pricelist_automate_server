const { NORMAL_ORACLE_MASTER_PROD } = require("../oracleConfig")
const queries = require("./OracleQueries")
const { price_list_electrode, Sequelize } = require('../models')
const XLSX = require("xlsx");
const path = require('path');
const { log } = require("console");

exports.insertDataInDB = async (req, res) => {
    try {
        const workbook = XLSX.readFile(path.join(__dirname, "../media/ADOR-FY25-PL-ELE-02-05th May 2024 f.xlsx"));
        const sheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[sheetName];
        const jsonData = XLSX.utils.sheet_to_json(worksheet);

        await Promise.all(jsonData.map(async val => {
            await price_list_electrode.create({
                item_code: val["Item Code"],
                brand_name: val["Brandname"],
                "size": val["Size (mm)"],
                uom: val["UoM"],
                price_list_amt: String(val["List Price as per UoM"]),
                description_1: val["Title"],
                classification: val["Classifications"],

            })
        }))
        res.status(200).json(jsonData)
    }
    catch (e) {
        console.log("error", e);
        res.status(400).json({ "error": e })
    }
}



exports.chunking = async (req, res) => {
    try {
        let _final_data = []
        let index_data = []
        const unique_item_code = await price_list_electrode.findAll({
            attributes: [
                [Sequelize.fn('DISTINCT', Sequelize.col('description_1')), 'description_1']
            ],
            order: [[Sequelize.literal('description_1'), 'ASC']],
        });
        console.log(unique_item_code);

        const fdata = await Promise.all(unique_item_code.map(async (obj) => {
            const { description_1 } = obj

            const data = await price_list_electrode.findAndCountAll({
                where: {
                    "description_1": description_1
                },
                attributes: ['item_code', 'brand_name', 'size', 'price_list_amt', 'classification','uom'],
                
            })

            const _data = [...Array(Number(Math.ceil(data?.rows?.length / 30))).keys()].map((x, i) => {
                return x
            })

            _data.map((x, i) => {
                const at = data?.rows?.slice(30 * i, 30 * (i + 1))
                index_data.push(description_1)
                return (
                    _final_data.push({
                        attributes: description_1,
                        data_count: at.length,
                        data:at ,
                    }))
            })
            
        }))

        console.log(index_data);
        

        

        res.json({ rows: "data.rows", _final_data })
    } catch (error) {
        res.json({ error })
    }
}