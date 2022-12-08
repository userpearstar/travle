const Controller = require("egg").Controller;
const path = require("path");
const fs = require("fs");
class UserController extends Controller {
    getParams(key) {
        if (this.ctx.request.method == "POST") { //获取post请求参数
            return this.ctx.request.body[key];
        } else { //获取get请求参数
            return this.ctx.request.query[key];
        }
    }
    async login() {
        try {
            let no = this.getParams("no");
            let pwd = this.getParams("pwd");
            const sql = "select * from user where no=? and pwd=?";
            let list = await this.ctx.app.mysql.query(sql, [no, pwd]);//[],[{}]
            this.ctx.response.body = { state: 1, list };
        } catch (e) {
            console.log(e);
            this.ctx.response.body = { state: -1 };
        }
    }
    async regist() {
        try {
            let no = this.getParams("no");
            let pwd = this.getParams("pwd");
            let name = this.getParams("name");
            const files = this.ctx.request.files;
            const file = files[0];
            const toFileName = '/public/upload/' + Date.now() + file.filename;
            let to = path.dirname(__dirname) + toFileName;
            fs.copyFileSync(file.filepath, to);
            fs.unlinkSync(file.filepath);
            //img的值为上传的图片的网络访问路径
            const img = `http://${this.ctx.request.header.host}${toFileName}`;
            console.log(no, pwd, name);
            const sql = "insert into user(no, pwd, name,headimg)values(?, ?, ?,?)";
            let res = await this.ctx.app.mysql.query(sql, [no, pwd, name, img]);
            console.log(res);
            this.ctx.response.body = { state: res.affectedRows };
        } catch (e) {
            console.log(e);
            this.ctx.response.body = { state: -1 };
        }
    }
}
module.exports = UserController