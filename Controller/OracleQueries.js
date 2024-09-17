const PRICE_LIST = (x) => {    
    return `SELECT
    aim.CONCATENATED_SEGMENTS,
    aim.AWS_CLASSIFICATION,
    aim.BRAND_NAME ,pld.name,
    CASE
    WHEN (aim."LENGTH" IS NOT NULL and aim.DIAMETER IS NOT NULL) THEN aim."LENGTH" || ' X ' || aim.DIAMETER
    ELSE null
END AS sizes,
aim.PRIMARY_UOM_CODE,
pld.LIST_PRICE
FROM
AWL_COPS.COPS_PRICE_LIST_DETAILS pld,
AWL_COPS.COPS_ITEM_MASTER aim
WHERE
1 = 1
AND CURRENCY_CODE != 'USD'
--AND rownum <= 50
AND pld.name='CONSUMABLE PRICE LIST - 05 MAY 2024'
AND aim.AWS_CLASSIFICATION ='${x}'
AND pld.INVENTORY_ITEM_ID = aim.INVENTORY_ITEM_ID`
}
const UNIQUE_ITEM_HEADER_IN_PRICE_LIST = () => { 
    return `
    SELECT * FROM (SELECT DISTINCT aim.brand_name FROM AWL_COPS.COPS_ITEM_MASTER aim ORDER BY aim.brand_name asc)a WHERE npmrownum<=10;
    `
}
const HYPERTHERM = () => {
    const q =`SELECT
        INFO_VALUE description_1,
        ITEM_DESCRIPTION sub_product,
        ITEM_CODE item,
        UOM uom,
        TO_NUMBER(TAG) index_order,
        TO_CHAR(LIST_PRICE) list_price_as_per_uom,ITEM_CODE_INDEX item_code_index 
        FROM
        CUS.ADOR_HYPERTHERM_V`
    return q
}
const WIRES_FLUX = () => {
    const q =`SELECT
        INFO_VALUE description_1,
        ITEM_CODE item_code,
        CLASSIFICATION classification,
        a.BRAND_NAME brand_name,
        PACKING PACKING,
        UOM uom,
        TO_CHAR(LIST_PRICE) list_price_as_per_uom,
        a.SZE "SIZE",
        TO_NUMBER(TAG) index_order,
        TO_NUMBER(ITEM_CODE_INDEX) item_code_index 
        FROM
        CUS.ADOR_WIRE_FLUX_V1 a`
    return q
}
const ELECTRODES = () => {
    const q =`SELECT
        INFO_VALUE description_1,
        ITEM_CODE item_code,
        CLASSIFICATION classification,
        a.BRAND_NAME brand_name,
        UOM uom,
        TO_CHAR(LIST_PRICE) list_price_as_per_uom,
        a.SZE "SIZE",
        TO_NUMBER(TAG) index_order,ITEM_CODE_INDEX item_code_index 
        FROM
        CUS.ADOR_WELDING_ELECT_V1 a`
    return q
}
const SPARES = () => {
    const q =` SELECT
        PARENT_CLASSIFICATION description_2,
        INFO_VALUE description_1,
        ITEM_DESCRIPTION item,
        PRODUCT_CODE product_code,
        UOM uom,
        TO_CHAR(LIST_PRICE) list_price,
        TO_NUMBER(TAG) index_order,ITEM_CODE_INDEX item_code_index 
        FROM
        CUS.ADOR_WELDING_SPARES_V`
    return q
}
const EGP = () => {
    const q = `SELECT
            INDEX_CLASSIFICATION description_1,
            PARENT_CLASSIFICATION description_2,
            PRODUCT_CLASSIFICATION description_3,
            OPTIONAL_CLASSIFICATION optional_classification,
            PRODUCT_CLASSIFICATION_INDEX product_classification_index,
            INDX index_order,
            DESCRIPTION brand_name,
            PRODUCT_CODE item_code,
            UOM uom,
            CATEGORY category,
            LIST_PRICE list_price,
            ITEM_CODE_INDEX item_code_index,
            OPTIONAL_ITEM_INDEX optional_item_index 
        FROM
        CUS.ADOR_WELDING_EQUIPT_GCP_PPE_V1`
    return q
}


const queries = {
    price_list: PRICE_LIST,
    unique_item_header_in_price_list: UNIQUE_ITEM_HEADER_IN_PRICE_LIST,
    HYPERTHERM,WIRES_FLUX,ELECTRODES,SPARES,EGP
}

module.exports = queries


