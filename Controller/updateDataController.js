const { NORMAL_ORACLE_MASTER_DEV } = require("../oracleConfig");
const { price_list_electrode, price_list_wires_and_flux, price_list_hypertherm, price_list_spares, price_list_egp,
} = require('../models')
const { performance } = require('perf_hooks');
const moment = require("moment");
const fs = require("fs");
const path = require("path");
const { SPARES, HYPERTHERM, WIRES_FLUX, ELECTRODES, EGP } = require("./OracleQueries");

exports.update_spares = async (req, res) => {
    const startTime = performance.now();
    try {
        const q = SPARES()
        const data = await oracle_query(q)
        await update_data_in_pg_spares(data)
        req && res.json(data)
        const endTime = performance.now();
        await _log({ len: data?.length, obj: "spares", time_take: `Took ${Math.round(-startTime + endTime) / 1000} secs` });
        
        return q
    } catch (error) {
        console.log("error in update_spares", error);

    }
}

exports.update_hypertherm = async (req, res) => {
    const startTime = performance.now();
    try {
        const q = HYPERTHERM()
        const data = await oracle_query(q)
        
        await update_data_in_pg_hypertherm(data)
        
        req && res.json(data)
        
        const endTime = performance.now();
        
        await _log({ len: data.length, obj: "hypertherm", time_take: `Took ${Math.round(-startTime + endTime) / 1000} secs` });

    } catch (error) {
        console.log("error in update_hypertherm", error);
    }

}

exports.update_wires_and_flux = async (req, res) => {
    const startTime = performance.now();
    try {
        const q = WIRES_FLUX()
        const data = await oracle_query(q)
        await update_data_in_pg_wires_and_flux(data)
        req && res.json(data)
        const endTime = performance.now();
        await _log({ len: data.length, obj: "wires_and_flux", time_take: `Took ${Math.round(-startTime + endTime) / 1000} secs` });
    } catch (error) {
        console.log("error in update_wires_and_flux", error);
    }

}
exports.update_electrodes = async (req, res) => {
    const startTime = performance.now();
    try {
        const q = ELECTRODES()
        const data = await oracle_query(q)
        update_data_in_pg_electrodes(data)
        req && res.json(data)
        const endTime = performance.now();
        console.log({ len: data?.length, obj: "electrodes", time_take: `Took ${Math.round(-startTime + endTime) / 1000} secs` });
    } catch (error) {
        console.log("error in update_electrodes", error);
    }

}

exports.update_egp = async (req, res) => {
    const startTime = performance.now();
    try {
        const q = EGP()
        const data = await oracle_query(q)
        await update_data_in_pg_egp(data)
        req && res.json(data)
        const endTime = performance.now();
        await _log({ len: data.length, obj: "egp", time_take: `Took ${Math.round(-startTime + endTime) / 1000} secs` });
    } catch (error) {
        console.log("error in update_egp", error);
    }

}

exports.update_all = async (req, res) => {
    try {
        const func = [
            // "update_electrodes",
            // "update_wires_and_flux",
            // "update_spares",
            // "update_hypertherm",
            "update_egp",       
        ]
        await Promise.all(func.map(async (x) => {
            await this[x]()
        }))
        res.json("done")
    } catch (error) {
        console.log(error);
        res.json({ error: JSON.stringify(error) })
    }
}

const update_data_in_pg_hypertherm = async (data) => {
    try {
        await Promise.all(data.map(async (x) => {
            const obj = {}
            Object.entries(x).map((y) => {
                return obj[y[0].toLowerCase()] = y[1]
            })
            await Promise.all(await price_list_hypertherm.upsert(
                obj,
                {
                    where: {
                        item: obj.item,
                        item_code_index: obj.item_code_index,
                        index_order: obj.index_order
                    }
                }
            ))
        }))
    } catch (error) {
        console.log("error in update_data_in_pg_hypertherm", error);
    }
}

const update_data_in_pg_wires_and_flux = async (data) => {
    try {
        await Promise.all(data.map(async (x) => {
            const obj = {}
            Object.entries(x).map((y) => {
                return obj[y[0].toLowerCase()] = y[1]
            })
            await Promise.all(await price_list_wires_and_flux.upsert(
                obj,
                {
                    where: {
                        item_code: obj.item_code,
                        index_order: obj.index_order,
                        item_code_index: obj.item_code_index
                    }
                }
            ))
        }))
    } catch (error) {
        console.log("error in update_data_in_pg_hypertherm", error);
    }
}

const update_data_in_pg_electrodes = async (data) => {
    let created_list=[]
    let updated_list=[]
    try {
        await Promise.all(data.map(async (x) => {
            const obj = {}
            Object.entries(x).map((y) => {
                return obj[y[0].toLowerCase()] = y[1]
            })
           const{created}=await Promise.all( await price_list_electrode.upsert(
               obj, {
                   where: {
                       item_code: obj.item_code,
                       item_code_index: obj.item_code_index,
                       index_order: obj.index_order,
                   }
                }
           ))
            // created ? created_list.push(created) : updated_list.push(created)
        }))
        // console.log({ created_list: created_list.length, updated_list: updated_list.length });
    } catch (error) {
        console.log("error in update_data_in_pg_hypertherm", error);
    }
}

const update_data_in_pg_spares = async (data) => {
    try {
        await Promise.all(data.map(async (x) => {
            const obj = {}
            Object.entries(x).map((y) => {
                return obj[y[0].toLowerCase()] = y[1] 
            })
            await Promise.all(await price_list_spares.upsert(
                obj, {
                    where: {
                        product_code: obj.product_code,
                        index_order: obj.index_order,
                        item_code_index: obj.item_code_index,
                    }
            }
            ))
        }))
    } catch (error) {
        console.log("error in update_data_in_pg_spares", error);
    }
}

const update_data_in_pg_egp = async (data) => {
    try {
        await Promise.all(data.map(async (x) => {
            const obj = {}
            Object.entries(x).map((y) => {return obj[y[0].toLowerCase()] = y[1]
            })
             await price_list_egp.upsert(
                 obj, {
                     where:
                     {
                         item_code: obj.item_code,
                         index_order: obj.index_order,
                         item_code_index: obj.item_code_index,
                     }
             }
            )
        }))
    } catch (error) {
        console.log("error in update_data_in_pg_spares", error);
    }
}

const _log =async (data) => {
    console.log(data);
    try {
        const apath = path.join(__dirname,`../call_check/${moment().format("DD_MM_YYYY")}.txt`);
            let stream = fs.createWriteStream(apath, { flags: "a+" });
            stream.once("open", async () => {
                stream.write(`-${moment().format("DD-MM-YYYY HH:MM:SS")}---------\n`);
                stream.write(`${JSON.stringify(data)}\n`);
                stream.write("-----------\n");
            });
            console.log("written");
        } catch (error) {
            console.log("devOnly", error);
        }
};

const oracle_query = async (_q) => {
    let condition=""
    condition = "where rownum <= 1000000000000"
    // condition ='where UPDATED_LIST_PRICE_DATE or LIST_PRICE_CREATION_DATE or LAST_UPDATE_DATE or CREATION_DATE '
    q = _q + " " + condition
    const { rows } = await NORMAL_ORACLE_MASTER_DEV(q);
    return rows
}