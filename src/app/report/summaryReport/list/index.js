import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import {Menu, Icon, Row, Col, Divider, Button, Form} from 'antd';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as actions from './index.action';
import Toast from "../../../../components/prompt/toast";
import CommonList from '../../../components/list/index';
import * as Util from "../../../../util";
import DialogForm from '../../../../components/dialog/dialogForm/index'
const WrappedAdvancedDialog=Form.create()(DialogForm);
var showDialogFormStatus = false;
import {filterData} from './filterData';

class SummaryReport extends Component {
    constructor(props) {
        super(props);
        this._getList = this._getList.bind(this);
        this._addFun = this._addFun.bind(this);
        this._editStatusFun = this._editStatusFun.bind(this);
        this._deleteFun = this._deleteFun.bind(this);

        this.state = {
            searchParams: {},
            dialogFormConfig:{
                title:'设置状态',
                formData:[],
                dialogWidth:500,
                dialogHeight:300,
                dialogButton:[]
            }
        }
    }

    _getList(params){
        this.setState({searchParams: params});
        this.props.getSummaryReportList(params);
    }

    _addFun(){
        this.props.history.push('/report-summary-new')

    }

    _deleteFun(record){
        showDialogFormStatus = true;
        let configObj = this.state.dialogFormConfig;
        configObj.title = '提示';
        configObj.dialogHeight=200;
        configObj.formData = [
            {
                type:'label',
                initialValue:'确定删除么？',
                className:'sure-text-label'
            }
        ]
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

    _editStatusFun(record){
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

    componentWillUpdate(nextProps, nextState) {
        //列表获取回掉函数
        Util.fetchCallback({
            status: nextProps.SummaryReport.summaryReportListStatus,
            code: nextProps.SummaryReport.summaryReportListCode,
            message: nextProps.SummaryReport.summaryReportListMessage,
            params: this.state.searchParams,
            updateStatus: nextProps.updateGetSummaryReportListStatus,
            successCallback:()=>{
            }
        });
    }

    componentDidMount(){

    }

    render() {
        let columns = [
            {title: '编码', dataIndex: 'sysName'},
            {title: '报表名称', dataIndex: 'sysCode'},
            {
                title: '操作',
                width:400,
                dataIndex: 'edit',
                render: (text, record) => {
                    return (
                        <div>
                            <Link to={'/report-summary-detail?id='+record.id}>查看报表</Link>
                            <Divider type={'vertical'}/>
                            <Link to={'/report-summary-new?type=edit&id='+record.id}>编辑</Link>
                            <Divider type={'vertical'}/>
                            <a onClick={()=>this._deleteFun(record)}>删除</a>
                        </div>
                    )
                }
            },
        ]
        let buttons = [
            {name:'新增',type:'primary',id:'addBtn',actionFun:'addFun'},
            // {name:'返回',type:'primary',id:'backBtn',actionFun:'backFun'},
        ];
        let tableDataSource = this.props.SummaryReport && this.props.SummaryReport.summaryReportListData;
        let pagination = this.props.SummaryReport && this.props.SummaryReport.summaryReportListPage;
        return (
            <div>
                <div className={'table-div'}>
                    <CommonList
                        history={this.props.history}
                        getCommonList={this._getList}
                        columns={columns}
                        tableDataSource={tableDataSource}
                        pagination={pagination}
                        buttons={buttons}
                        filterData={filterData}
                        showFilter={true}
                        addFun={this._addFun}
                        backFun={()=>{this.props.history.goBack()}}
                    />
                </div>
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
        return {SummaryReport: state.SummaryReport, Fetch: state.Fetch}
    },
    (dispatch) => bindActionCreators({...actions}, dispatch)
)(SummaryReport);
