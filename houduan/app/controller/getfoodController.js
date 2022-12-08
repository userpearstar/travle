const Controller = require("egg").Controller;
class GetfoodController extends Controller {
    getParams(key) {
        if (this.ctx.request.method == "POST") { //获取post请求参数
            return this.ctx.request.body[key];
        } else { //获取get请求参数
            return this.ctx.request.query[key];
        }
    }
    async getfoodbyuserid() {
        let uid = this.getParams('uid')
        const sql = 'select * from food where id in(select fid from collection where uid=?)'
        let list = await this.ctx.app.mysql.query(sql, [uid])
        this.ctx.response.body = list
    }
    async getuser() {
        let userId = this.getParams('userid')
        const sql = 'select * from user where userId=?'
        let list = await this.ctx.app.mysql.query(sql, [userId])
        this.ctx.response.body = list

    }
    async getfoodbyid() {
        let id = this.getParams('id')
        const sql = 'select * from food where id=?'
        let list = await this.ctx.app.mysql.query(sql, [id])
        this.ctx.response.body = list

    }
    async getfood() {
        const sql = 'select * from food'
        let list = await this.ctx.app.mysql.query(sql)
        this.ctx.response.body = list
    }
    async getcity() {
        const sql = 'select * from city'
        let list = await this.ctx.app.mysql.query(sql)
        this.ctx.response.body = list
    }
    async getcityfood() {
        const cid = this.getParams('cid')
        const sql = 'select * from food where cid=? '
        let list = await this.ctx.app.mysql.query(sql, [cid])
        this.ctx.response.body = list

    }
    async getsgood() {
        const id = this.getParams('id')
        const sql = 'select * from food where id=?'
        let list = await this.ctx.app.mysql.query(sql, [id])
        this.ctx.response.body = list

    }
    async getcomment() {
        let fid = this.getParams('fid')
        const sql = 'select * from foodcomment inner join user on foodcomment.uid=user.userId where foodcomment.fid=? '
        let list = await this.ctx.app.mysql.query(sql, [fid])
        this.ctx.response.body = list

    }
    async addcomment() {
        let userId = this.getParams('userId')
        let comments = this.getParams('comments')
        let grade = this.getParams('grade')
        let time = this.getParams('time')
        let fid = this.getParams('fid')
        const sql = 'insert into foodcomment(comments,grade,time,uid,gnumber,fid)values(?,?,?,?,?,?)'
        let list = await this.ctx.app.mysql.query(sql, [comments, grade, time, userId, 0, fid])
        this.ctx.response.body = list
    }
    async addgnumber() {
        let id = this.getParams('id')

        const sql = 'update foodcomment set gnumber=gnumber+1 where id=?'
        let list = await this.ctx.app.mysql.query(sql, [id])
        this.ctx.response.body = list

    }
    async getcollect() {
        let fid = this.getParams('fid')
        let uid = this.getParams('uid')
        const sql = 'select * from collection where fid=? and uid=?'
        let list = await this.ctx.app.mysql.query(sql, [fid, uid])
        this.ctx.response.body = list

    }
    async addcollect() {
        let fid = this.getParams('fid')
        let uid = this.getParams('uid')
        let ii = this.getParams('ii')
        if (ii == 0) {
            const sql = 'insert into collection(fid,uid)values(?,?)'
            let list = await this.ctx.app.mysql.query(sql, [fid, uid])
            this.ctx.response.body = list.affectedRows
        }
        else {
            const sql = 'delete from collection where fid=? and uid=?'
            let list = await this.ctx.app.mysql.query(sql, [fid, uid])
            this.ctx.response.body = list.affectedRows

        }


    }
    async deletecomment() {
        let id = this.getParams('id')
        const sql = 'delete from foodcomment where id=?'
        let list = await this.ctx.app.mysql.query(sql, [id])
        this.ctx.response.body = list.affectedRows
    }
    async foodcollection() {
        let uid = this.getParams('uid')
        const sql = 'select * from collection where uid=?and fid is not null'
        let list = await this.ctx.app.mysql.query(sql, [uid])
        this.ctx.response.body = list

    }
    async getScenicsbyuserid() {
        let uid = this.getParams('uid')
        const sql = 'select * from scenery where id in(select sid from collection where uid=?)'
        let list = await this.ctx.app.mysql.query(sql, [uid])
        this.ctx.response.body = list
    }
    async gethousebyuserid() {
        let uid = this.getParams('uid')
        const sql = 'select * from house where id in(select hid from collection where uid=?)'
        let list = await this.ctx.app.mysql.query(sql, [uid])
        this.ctx.response.body = list
    }


}
module.exports = GetfoodController