import React, {Component} from 'react';
import {Form} from 'antd';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as actions from './index.action';
import PicTextNew from './pixTextNew';
import * as Util from '../../../../util/';
import Loader from '../../../../components/loader/';
import Toast from "../../../../components/prompt/toast";

var selectData = [{name:'图片',id:2},{name:'文字',id:1}]
var newData = [
    {
        id: 'add',
        name: '+',
        type:'button',
        clickHandleName:'addFun',
        size:'small',
        buttonType:'primary',
        style:{marginTop:"20px",display:'block'},
    },
    {
        id:'model-1',
        type:'select',
        data:selectData,
        name:'内容模型1'
    },
    {
        id:'input-1',
        type:'input',
        name:'文案1',
        isHide:true
    },
    {
        id:'img-1',
        type:'uploadImg',
        name:'图片1',
        fileList:[],
        isHide:true
    },
    {
        id:'weight-1',
        type:'number',
        name:'权重'
    },
    {
        id: 'delete-1',
        name: '-',
        type:'button',
        clickHandleName:'deleteFun',
        size:'small',
        buttonType:'primary',
        style:{marginTop:"20px"},
    },
]
const WrappedAdvancedNew=Form.create()(PicTextNew);

class NewPicText extends Component {
    constructor(props) {
        super(props);
        this.refresh = this.refresh.bind(this);
        this.deleteFun = this.deleteFun.bind(this);
        this.addFun = this.addFun.bind(this);
        this.state = {
            id:0,
            type:'' //''==新建，detail=详情, edit=编辑
        }
    }

    refresh(list,id){
        newData.forEach((ele,index)=>{
            if(ele.id==id){
                ele.fileList = list;
            }
        })
    }

    addFun(){
        let flag = new Date().getTime()
        let nullObj = [{
            id:'model-'+flag,
            type:'select',
            data:selectData,
            name:'内容模型'
        },
        {
            id:'input-'+flag,
            type:'input',
            name:'文案',
            isHide:true
        },
        {
            id:'img-'+flag,
            type:'uploadImg',
            name:'图片',
            fileList:[],
            isHide:true
        },{
                id:'weight-'+flag,
                type:'number',
                name:'权重'
            },{
                id: 'delete-'+flag,
                name: '-',
                type:'button',
                clickHandleName:'deleteFun',
                size:'small',
                buttonType:'primary',
                style:{marginTop:"20px"},
            }]
        newData = newData.concat(nullObj);
        this.setState({})
    }
    deleteFun(obj,id){
        console.log(id);
        let flag = id.split('-')[1];
        let list = []
        newData.forEach((ele,index)=>{
            if(!ele.id.endsWith('-'+flag)){
                list.push(ele);
            }
        })
        newData = list;
        this.setState({})
    }

    componentDidMount(){
        let id = Util.getUrlArg('id')||0;
        let type = Util.getUrlArg('type');
        //编辑或者查看详情
        if(id){
            this.props.getDetailPicText({id});

            if(type=='detail'){
                newData.forEach((ele)=>{
                    ele.disabled = true;
                })
            } else {
                newData.forEach((ele)=>{
                    ele.disabled = false;
                })
            }
        } else {
            //新增
            Util.resetInitialValue(newData);
            newData.forEach((ele)=>{
                newData.forEach((ele)=>{
                    ele.disabled = false;
                })
            })
        }
        this.setState({id:id,type:type})
    }

    componentWillUpdate (nextProps, nextState) {
        Util.fetchCallback({
            status: nextProps.NewPicText.addNewPicTextStatus,
            code: nextProps.NewPicText.addNewPicTextCode,
            message: nextProps.NewPicText.addNewPicTextMessage,
            updateStatus: nextProps.updateAddNewPicTextStatus,
            isShowToastSuccess: true,
            successText: '操作成功',
            successCallback: () => {
                this.props.history.goBack();
            }
        });

        //获取详情初始值，并push到对应的newData中
        Util.fetchCallback({
            status: nextProps.NewPicText.getDetailPicTextStatus,
            code: nextProps.NewPicText.getDetailPicTextCode,
            message: nextProps.NewPicText.getDetailPicTextMessage,
            updateStatus: nextProps.updateGetDetailPicTextStatus,
            successCallback: () => {
                let data = nextProps.NewPicText.getDetailPicTextData&&nextProps.NewPicText.getDetailPicTextData[0];
                Util.setInitialValue(newData, data);
            }
        });
    }

    render() {
        var actionButtons = [{
            text: '保存',
            id: 'save',
            type: 'primary',
            actionSubmitAlert:true,
            submitAlertInfo:{mainText:'确定保存吗？'},
            clickHandle:(values)=>{
                if(this.state.id){
                    values.id = this.state.id;
                } else {
                    delete values.id;
                }
                let list = [];
                list.push(values);
                this.props.addNewPicText(list);
            }
        },
            {
                text:'返回',
                id:'cancel',
                notCheck:true,
                clickHandle:()=>{
                    this.props.history.goBack();
                }
            }]
        //详情页面去掉保存按钮
        if(this.state.type=='detail'){
            actionButtons.shift();
        }
        console.log(newData,'====')

        newData.forEach((ele,index)=>{
            if(ele.type=='select'){
                let flag = ele.id.split('-')[1];
                ele.onChange = ((value)=>{

                    newData.forEach((item)=>{
                        if(item.id==('input-'+flag)){
                            if(value==1){
                                item.isHide = false;
                            } else {
                                item.isHide = true;
                            }
                        } else if(item.id==('img-'+flag)){
                            if(value==2){
                                item.isHide = false;
                            } else {
                                item.isHide = true;
                            }
                        }
                    })
                })

            }
        })
        return (
            <div>
                <WrappedAdvancedNew
                    newData={newData}
                    //编辑页面传递detailData,创建页面不传递detailData
                    detailData={this.state.id?this.props.NewPicText.getDetailPicTextData:null}
                    history={this.props.history}
                    actionButtons = {actionButtons}
                    refreshListFun={this.refresh}
                    deleteFun={this.deleteFun}
                    addFun={this.addFun}
                />
                <Loader spinning={this.props.Fetch.spinning || false} />
            </div>
        );
    }
}

export default connect(
    (state) => {
        return {NewPicText: state.NewPicText, Fetch: state.Fetch}
    },
    (dispatch) => bindActionCreators({...actions}, dispatch)
)(NewPicText);

