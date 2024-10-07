const { NORMAL_ORACLE_MASTER_DEV } = require("../oracleConfig");
const { price_list_electrode, price_list_wires_and_flux, price_list_hypertherm, price_list_spares, price_list_egp,
} = require('../models')
const { performance } = require('perf_hooks');
const moment = require("moment");
const fs = require("fs");
const path = require("path");
const { SPARES, HYPERTHERM, WIRES_FLUX, ELECTRODES, EGP } = require("./OracleQueries");
const schedule = require("node-schedule");

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
            "update_electrodes",
            "update_wires_and_flux",
            "update_spares",
            "update_hypertherm",
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
            await price_list_hypertherm.destroy({truncate: true,});
            await price_list_hypertherm.create(obj)
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
            await price_list_wires_and_flux.destroy({ truncate: true });
            await price_list_wires_and_flux.create(obj)
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
            await price_list_electrode.destroy({ truncate: true });
            await price_list_electrode.create(obj)
        }))
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
            await price_list_spares.destroy({ truncate: true });
            await price_list_spares.create(obj)
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
            await price_list_egp.destroy({ truncate: true });
             await price_list_egp.create(obj)
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
    const start_timestamp = moment().subtract(3, 'hours').format('YYYY-MM-DD HH:MM:SS')
    const end_timestamp = moment().format('YYYY-MM-DD HH:MM:SS')
    let condition=""
    condition = "where rownum <= 1000000000000"
    // condition =`where UPDATED_LIST_PRICE_DATE BETWEEN TO_TIMESTAMP('${start_timestamp}', 'YYYY-MM-DD HH24:MI:SS') AND TO_TIMESTAMP('${end_timestamp}', 'YYYY-MM-DD HH24:MI:SS')OR
    //             LIST_PRICE_CREATION_DATE BETWEEN TO_TIMESTAMP('${start_timestamp}', 'YYYY-MM-DD HH24:MI:SS') AND TO_TIMESTAMP('${end_timestamp}', 'YYYY-MM-DD HH24:MI:SS')OR
    //             LAST_UPDATE_DATE BETWEEN TO_TIMESTAMP('${start_timestamp}', 'YYYY-MM-DD HH24:MI:SS') AND TO_TIMESTAMP('${end_timestamp}', 'YYYY-MM-DD HH24:MI:SS')OR
    //             CREATION_DATE BETWEEN TO_TIMESTAMP('${start_timestamp}', 'YYYY-MM-DD HH24:MI:SS') AND TO_TIMESTAMP('${end_timestamp}', 'YYYY-MM-DD HH24:MI:SS')`
    q = _q + " " + condition
    const { rows } = await NORMAL_ORACLE_MASTER_DEV(q);
    return rows
}

schedule.scheduleJob("0 6-20/3 * * *", () => {
    try {
        console.log("started the scheduller");
        this.update_all()
    } catch (error) {
        console.log("error in running scheduller",error);
    }
});







