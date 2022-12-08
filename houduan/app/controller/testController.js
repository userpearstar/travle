const Controller = require("egg").Controller;
const path = require("path");
const fs = require("fs");
class TestController extends Controller {
	//获取请求参数的工具函数
	getParams(key) {
		if (this.ctx.request.method == "POST") { //获取post请求参数
			return this.ctx.request.body[key];
		} else { //获取get请求参数
			return this.ctx.request.query[key];
		}
	}
	async test() {
		try {
			let id = this.getParams("id");
			let name = this.getParams("name");
			console.log(id,name);
			this.ctx.response.body = {state:1, inf:"成功"};
		} catch (e) {
			console.log(e);
			this.ctx.response.body = {
				state: -1
			};
		}
	}
	//带参数的文件上传, 要求在public下创建upload目录
	async uploadFileWithParams() {
		try {
			//获取上传文件时的附加参数
			let name = this.getParams("name");
			let price = this.getParams("price");
			console.log(`name=${name},price=${price}`);

			//上传文件到app/public/upload目录，并得到上传后文件的访问路径
			const files = this.ctx.request.files;
			const file = files[0];
			const toFileName = '/public/upload/' + Date.now() + file.filename;
			let to = path.dirname(__dirname) + toFileName;
			fs.copyFileSync(file.filepath, to);
			fs.unlinkSync(file.filepath);
			
			const url = `http://${this.ctx.request.header.host}${toFileName}`;
			this.ctx.response.body = {state: 1,url};
		} catch (e) {
			console.log(e);
			this.ctx.response.body = {state: -1};
		}
	}
}
module.exports = TestController;
