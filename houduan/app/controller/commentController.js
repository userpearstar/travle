const Controller = require("egg").Controller;

class CommentController extends Controller {
	getParams(key) {
		if (this.ctx.request.method == "POST") { //获取post请求参数
			return this.ctx.request.body[key];
		} else { //获取get请求参数
			return this.ctx.request.query[key];
		}
	}
	
	async getCommentBySid () {
		try {
			let sid = this.getParams("sid");
			const sql ="select scenerycontent.id cid, content,id,uid,name,headimg,sid from scenerycontent inner join user on user.userId=uid and sid=?";
			let list = await this.ctx.app.mysql.query(sql,[sid]);
			this.ctx.response.body = {state:1, list};
		}catch(e) {
			console.log(e);
			this.ctx.response.body = {state:-1};
		}
	}
	// 
	// 增加一个评论
	async addComment() {
		try {
			let sid = this.getParams("num");
			let uid = this.getParams("uid");
			let content = this.getParams("content");
			const sql = "insert into  scenerycontent(sid,uid,content)value(?,?,?)";
			let res = await this.ctx.app.mysql.query(sql,[sid,uid,content]);
			this.ctx.response.body = {state: res.affectedRows};
		}catch(e) {
			console.log(e);
			this.ctx.response.body = {state:-1};
		}
	}
}
module.exports = CommentController; 