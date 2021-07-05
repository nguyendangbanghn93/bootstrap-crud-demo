export const formatDate = (date, stringFormat) => {
    // "{j}/{n}/{f} - {h}:{m}"
    const d = new Date(date);
    if (!d.getDate()) {
        return ''
    }
    const o = {
        f: d.getFullYear(), //năm
        j: ("0" + d.getDate()).substr(-2), // ngày
        n: ("0" + (d.getMonth() + 1)).substr(-2), // tháng
        h: ("0" + d.getHours()).substr(-2), //giờ
        m: ("0" + d.getMinutes()).substr(-2), //phút
        s: ("0" + d.getSeconds()).substr(-2), //giây
        d: ["T2", "T3", "T4", "T5", "T6", "T7", "CN"][d.getDay()], //Thứ
        t: d.getMilliseconds(), //mls
        u: Math.ceil(d.getMilliseconds() / 1000)//timestamp
    };
    if (typeof stringFormat === "string") {
        return stringFormat.replace(/{.}/g, (a) =>  o[ a.replace(/[{}]/g, "")])
    } else {
        return o;
    }
}
// export const stringToDate = (string,format)=>{
//     format.replace(/{.}/g, (a) => {
//         a = a.replace(/[{}]/g, "");
//         return o[a]
//     })
// }
