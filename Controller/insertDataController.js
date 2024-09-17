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

exports.INSERT_DATA_FROM_XL_TO_DB_ELECTRODE = async (req, res) => {
    try {
    const price_list_electrode_xl = "ADOR-FY25-PL-ELE-02-05th May 2024 f.xlsx";
    const model_name = price_list_electrode;

    const json_data = xl_to_json(price_list_electrode_xl)
    await Promise.all(
        json_data.map(async (val) => {

            await model_name.create({
                item_code: val["Item Code"],
                brand_name: val["Brandname"],
                size: val["Size (mm)"],
                uom: val["UoM"],
                list_price_as_per_uom: String(val["List Price as per UoM"]),
                description_1: val["desc1"],
                classification: val["Classifications"],
            });
        })
    );
        res.status(200).json({ json_data, len: json_data.length });
    } catch (error) {
        console.log(error);
        res && res.json
    }
};
exports.INSERT_DATA_FROM_XL_TO_DB_HYPERTHERM = async (req, res) => {
    try {
    const price_list_hypertherm_xl = "ADOR-FY25-PL-HYP-01-13th Apr 2024.xlsx";
    const model_name = price_list_hypertherm;
    const json_data = xl_to_json(price_list_hypertherm_xl)
    await Promise.all(
        json_data.map(async (val) => {

            await model_name.create({
                sub_product: val["Brandname"],
                uom: val["UoM"],
                list_price_as_per_uom: String(val["List Price as per UoM"]),
                description_1: val["desc1"],
                item: val["Item Code"],
            });
        })
    );
    res.status(200).json({ json_data, len: json_data.length });
} catch (error) {
    console.log(error);
    res && res.json
}
};
exports.INSERT_DATA_FROM_XL_TO_DB_WandF = async (req, res) => {
    try {
    const price_list_wires_and_flux_xl = "ADOR-FY25-PL-W&F-02-05th May 2024.xlsx";
    const model_name = price_list_wires_and_flux;
    const json_data = xl_to_json(price_list_wires_and_flux_xl)
    await Promise.all(
        json_data.map(async (val) => {

            await model_name.create({
                item_code: val["Item Code"],
                brand_name: val["Brandname"],
                size: val["Size (mm)"],
                uom: val["UoM"],
                list_price_as_per_uom: String(val["List Price as per UoM"]),
                description_1: val["desc1"],
                packing: val["Packing"],
                classification: val["Classifications"],
            });
        })
    );
    res.status(200).json({ json_data, len: json_data.length });
} catch (error) {
    console.log(error);
    res && res.json
}
};
exports.INSERT_DATA_FROM_XL_TO_DB_SPARES = async (req, res) => {
    try {
    const price_list_spares_xl = "ADOR-DOM-SPARES-PL-FY24-02-2nd Nov 2023.xlsx";
    const model_name = price_list_spares;
    const json_data = xl_to_json(price_list_spares_xl)
    await Promise.all(
        json_data.map(async (val) => {
            await model_name.create({
                item: val["Brandname"],
                product_code: val["Item Code"],
                uom: val["UoM"],
                list_price: String(val["List Price as per UoM"]),
                description_1: val["desc1"],
                description_2: val["desc2"],
            });
        })
    );
    res.status(200).json({ json_data, len: json_data.length });
} catch (error) {
    console.log(error);
    res && res.json
}
};
exports.INSERT_DATA_FROM_XL_TO_DB_EGP = async (req, res) => {
    try {
    const price_list_egp_xl = "ADOR-FY25-PL-EGP-01-10th Apr 2024.xlsx";
    const model_name = price_list_egp;
        const json_data = xl_to_json(price_list_egp_xl)
        await Promise.all(
            json_data.map(async (val) => {
            await model_name.create({
                item_code: val["ITEM_CODE"],
            });
        })
    );
    
    res.status(200).json({ json_data, len: json_data.length });
} catch (error) {
    console.log(error);
    res && res.json
}
};

function xl_to_json(filename) {
    const workbook = XLSX.readFile(
        path.join(__dirname, `../media/${filename}`)
    );
    const sheetName = workbook.SheetNames[0];
    const worksheet = workbook.Sheets[sheetName];
    const json_data = XLSX.utils.sheet_to_json(worksheet);
    return json_data
}











