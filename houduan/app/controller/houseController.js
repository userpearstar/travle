const Controller = require("egg").Controller;
const path = require("path");
const fs = require("fs");

class houseController extends Controller {
	//获取请求参数的工具函数, 可以把getParams可以放在一个继承了Controller的类（BaseController）中，然后别的控制层的类就继承BAseController就可以公用该方法。
	getParams(key) {
		if (this.ctx.request.method == "POST") { //获取post请求参数
			return this.ctx.request.body[key];
		} else { //获取get请求参数
			return this.ctx.request.query[key];
		}
	}
	//scenics(景点):        id,    name,     introduce(介绍),      img,     praise(点赞数量),    time(发布时间),  uid(用户id), 
	async getAllScenics() {
		try {
			const sql = "select * from house";
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
			const sql = 'select * from house where id=?'
			//长度为1的对象数组
			const list = await this.ctx.app.mysql.query(sql,[sid]);//[{...}]
			this.ctx.response.body = {state:1, list};
		}catch(e) {
			console.log(e)
			this.ctx.response.body = {state: -1};
		}
	}
	async getco(){
		let hid = this.getParams('hid')
        let uid = this.getParams('uid')
        const sql = 'select * from collection where hid=? and uid=?'
        let list = await this.ctx.app.mysql.query(sql, [hid, uid])
        this.ctx.response.body = list

	}
	async addcollect() {
        let hid = this.getParams('hid')
        let uid = this.getParams('uid')
        let ii = this.getParams('ii')
        if (ii == 0) {
            const sql = 'insert into collection(hid,uid)values(?,?)'
            let list = await this.ctx.app.mysql.query(sql, [hid, uid])
            this.ctx.response.body = list.affectedRows
        }
        else {
            const sql = 'delete from collection where hid=? and uid=?'
            let list = await this.ctx.app.mysql.query(sql, [hid, uid])
            this.ctx.response.body = list.affectedRows

        }


    }

}
module.exports=houseController;