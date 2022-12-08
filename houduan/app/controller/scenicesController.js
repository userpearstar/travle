const Controller = require("egg").Controller;
const path = require("path");
const fs = require("fs");

class ScenicsController extends Controller {
	//获取请求参数的工具函数, 可以把getParams可以放在一个继承了Controller的类（BaseController）中，然后别的控制层的类就继承BAseController就可以公用该方法。
	getParams(key) {
		if (this.ctx.request.method == "POST") { //获取post请求参数
			return this.ctx.request.body[key];
		} else { //获取get请求参数
			return this.ctx.request.query[key];
		}
	}
    async getAllScenics() {
		try {
			const sql = "select id,name,content,headimg,time,title,area from scenery";
			const list = await this.ctx.app.mysql.query(sql);
			this.ctx.response.body = {state:1, list};
		}catch(e) {
			console.log(e);
			this.ctx.response.body = {state: -1};
		}
	}
	async getScenicsById() {
		try {
			let sid = this.getParams("sid");//景点的主键值
			const sql = 'select * from scenery where id=?'
			//长度为1的对象数组
			const list = await this.ctx.app.mysql.query(sql,[sid]);//[{...}]
			this.ctx.response.body = {state:1, list};
		}catch(e) {
			console.log(e)
			this.ctx.response.body = {state: -1};
		}
	}
}
module.exports = ScenicsController;