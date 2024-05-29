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

const queries = {
    price_list: PRICE_LIST,
    unique_item_header_in_price_list: UNIQUE_ITEM_HEADER_IN_PRICE_LIST
}

module.exports=queries