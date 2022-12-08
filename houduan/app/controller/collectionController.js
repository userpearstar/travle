const Controller = require("egg").Controller;

class CollectionController extends Controller {
	getParams(key) {
		if (this.ctx.request.method == "POST") { //获取post请求参数
			return this.ctx.request.body[key];
		} else { //获取get请求参数
			return this.ctx.request.query[key];
		}
	}
	
	//是否收藏
	async checkedCon() {
		try {
			let sid = this.getParams("num");
			let uid = this.getParams("uid");
			const sql = 'select count(*) as flag from collection where uid=? and sid=?';
			// [{flag:0}]  [{flag:1}]
			console.log(sid,uid);
			let list = await this.ctx.app.mysql.query(sql,[uid, sid])
			console.log(list);
			this.ctx.response.body = {state:1, ...list[0]};
			//{state:1, flag:0}, {state:1, flag:1};
		}catch(e) {
			console.log(e);
			this.ctx.response.body = {state:-1};
		}
	}
	//收藏或取消收藏
	async conOrCancle() {
		try {
			let uid = this.getParams("uid");
			let sid = this.getParams("sid");
			let con = this.getParams("con");//con==0没有收藏， con==1已经收藏
			let sql = null;
			if(con==0) {//没有收藏，增加收藏
				sql = "insert into collection(uid,sid)values(?, ?)";
			}else {//已经收藏，删除收藏
				sql = "delete from collection where uid=? and sid=?";
			}
			let res = await this.ctx.app.mysql.query(sql,[uid, sid])
			console.log(res);
			this.ctx.response.body = {state:1, affectedRows:res.affectedRows};
			
		}catch(e) {
			console.log(e);
			this.ctx.response.body = {state:-1};
		}
	}
	
}
module.exports = CollectionController; 