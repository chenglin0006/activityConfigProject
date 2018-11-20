import React, {Component} from 'react';
import {Form} from 'antd';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as actions from './index.action';
import New from '../../../components/new/index';
import * as Util from '../../../../util/';
import Loader from '../../../../components/loader/';
import {newData} from './data';
import Toast from "../../../../components/prompt/toast";
import DialogForm from '../../../../components/dialog/dialogForm/index'

const WrappedAdvancedNew=Form.create()(New);
const WrappedAdvancedDialog=Form.create()(DialogForm);
var showDialogFormStatus = false;

class NewSummaryReport extends Component {
    constructor(props) {
        super(props);
        this._previewFun = this._previewFun.bind(this);
        this.state = {
            id:0,
            type:'', //''==新建，detail=详情, edit=编辑
            dialogFormConfig:{
                title:'查看效果',
                formData:[],
                dialogWidth:500,
                dialogHeight:300,
                dialogButton:[]
            }
        }
    }

    _previewFun(data){
        console.log(data);
        showDialogFormStatus = true;
        let configObj = this.state.dialogFormConfig;
        configObj.dialogButton=[{
                text: '取消',
                clickHandle: () => {
                    showDialogFormStatus = false;
                    this.setState({});
                }
            },
            {
                text: '确认',
                type: 'primary',
                clickHandle: (values) => {
                    showDialogFormStatus = false;
                    this.setState({});
                }
            }]
        this.setState({dialogFormConfig:configObj});
    }

    componentDidMount(){
        let id = Util.getUrlArg('id')||0;
        let type = Util.getUrlArg('type');
        //编辑或者查看详情
        if(id){
            this.props.getDetailSummaryReport({id});
            if(type=='detail'){
                newData.forEach((ele)=>{
                    ele.disabled = true;
                })
            } else {
                newData.forEach((ele)=>{
                    ele.disabled = false;
                    if(ele.id=='sysName'){
                        ele.disabled = true
                    }
                })
            }
        } else {
            //新增
            Util.resetInitialValue(newData);
            newData.forEach((ele)=>{
                ele.disabled = false;
                if(ele.id=='sysName'){
                    ele.disabled = false
                }
            })
        }
        this.setState({id:id,type:type})
    }

    componentWillUpdate (nextProps, nextState) {
        Util.fetchCallback({
            status: nextProps.NewSummaryReport.addNewSummaryReportStatus,
            code: nextProps.NewSummaryReport.addNewSummaryReportCode,
            message: nextProps.NewSummaryReport.addNewSummaryReportMessage,
            updateStatus: nextProps.updateAddNewSummaryReportStatus,
            isShowDialog: true,
            successText: '操作成功',
            successCallback: () => {
                this.props.history.goBack();
            }
        });

        //获取详情初始值，并push到对应的newData中
        Util.fetchCallback({
            status: nextProps.NewSummaryReport.getDetailSummaryReportStatus,
            code: nextProps.NewSummaryReport.getDetailSummaryReportCode,
            message: nextProps.NewSummaryReport.getDetailSummaryReportMessage,
            updateStatus: nextProps.updateGetDetailSummaryReportStatus,
            successCallback: () => {
                let data = nextProps.NewSummaryReport.getDetailSummaryReportData&&nextProps.NewSummaryReport.getDetailSummaryReportData[0];
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
            submitAlertInfo:{mainText:'确定保存Token吗？'},
            clickHandle:(values)=>{
                if(this.state.id){
                    values.id = this.state.id;
                } else {
                    delete values.id;
                }
                this.props.addNewSummaryReport(values);
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
        return (
            <div>
                <WrappedAdvancedNew
                    newData={newData}
                    //编辑页面传递detailData,创建页面不传递detailData
                    detailData={this.state.id?this.props.NewSummaryReport.getDetailSummaryReportData:null}
                    history={this.props.history}
                    actionButtons = {actionButtons}
                    previewFun={this._previewFun}
                />
                <Loader spinning={this.props.Fetch.spinning || false} />
                {showDialogFormStatus?<WrappedAdvancedDialog
                    title={this.state.dialogFormConfig.title}
                    formData={this.state.dialogFormConfig.formData}
                    dialogWidth={this.state.dialogFormConfig.dialogWidth}
                    dialogButton={this.state.dialogFormConfig.dialogButton}
                    dialogHeight={this.state.dialogFormConfig.dialogHeight}
                />:''}
            </div>
        );
    }
}

export default connect(
    (state) => {
        return {NewSummaryReport: state.NewSummaryReport, Fetch: state.Fetch}
    },
    (dispatch) => bindActionCreators({...actions}, dispatch)
)(NewSummaryReport);

