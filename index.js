const koa=require("koa")
const body=require("koa-bodyparser")
const router=require("koa-router")()
const query=require("./db/quer")
const connect=require("./db/db")
const app=new koa()
app.use(body())
app.use(router.routes())
app.use(router.allowedMethods())

// router.get("/api/list",async (ctx,next)=>{
//     let data=await query('select * from twolist')
//     ctx.body =data
//     next()
// })
router.get('/api/list',async ctx => {
    let {page=1,pageSize=3}=ctx.query
    let sum=await query('select count(*) from twolist')
    let data=await query(`select * from twolist limit ${(page-1)*pageSize},${pageSize}`)
    ctx.body={
        sum:sum[0]['count(*)'],
        data
    }
})
router.post('/api/add',async ctx => {
    let {title,user,idd} = ctx.request.body;
  console.log(title,user,idd)
    if(title && user){
        
            let data = await query('insert into twolist (title,user,idd) values (?,?,?)',[title,user,idd]);
            if(data.msg === 'error'){
                ctx.body = {
                    code:0,
                    msg:error
                }
            }else{
                ctx.body = {
                    code:1,
                    msg:'添加成功'
                }
            }
    }else{
        ctx.body = {
            code:2,
            msg:'参数缺失'
        }
    }
   
})

router.get('/api/del',async ctx => {
    let {ids} = ctx.query;
    if(ids || ids === 0){
        try{
            await query('delete from twolist where ids=?',[ids])
            ctx.body = {
                code:1,
                msg:'删除成功'
            }
        }catch(e){
            ctx.body = {
                code:0,
                msg:e.error
            }
        }
    }else{
        ctx.body = {
            code:2,
            msg:'参数缺失'
        }
    }
})
router.post('/api/edit',async ctx => {
    let {user,idd,title,ids} = ctx.request.body;
  console.log(user,idd,title,ids)
    if(ids && user && idd && title){
        try{
            let create_time = new Date();
            await query('update twolist set user=?,title=?,idd=? where ids=?',[user,idd,title,ids])
            ctx.body = {
                code:1,
                msg:'修改成功'
            }
        }catch(e){
            ctx.body = {
                code:0,
                msg:e.error
            }
        }
    }else{
        ctx.body = {
            code:2,
            msg:'参数缺失'
        }
    }
})

app.listen(7001)