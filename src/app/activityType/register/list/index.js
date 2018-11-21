import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import {Divider,Form} from 'antd';
import {filterData} from './filterData';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import CommonList from '../../../components/list/index';
import * as actions from './index.action';
import * as Util from '../../../../util/';
import DialogForm from '../../../../components/dialog/dialogForm/index'
const WrappedAdvancedDialog=Form.create()(DialogForm);
var showDialogFormStatus = false;

class RegisterList extends Component {
    constructor(props) {
        super(props);

        this._getRegisterList = this._getRegisterList.bind(this);
        this._addFun = this._addFun.bind(this);
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

    _addFun(){
        this.props.history.push('/activity-register-new')
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

    //调接口获取列表
    _getRegisterList(params) {
        this.setState({searchParams: params});
        this.props.getRegisterList(params);
    }


    componentWillUpdate(nextProps, nextState) {
        //列表获取回掉函数
        Util.fetchCallback({
            status: nextProps.RegisterList.registerListStatus,
            code: nextProps.RegisterList.registerListCode,
            message: nextProps.RegisterList.registerListMessage,
            params: this.state.searchParams,
            updateStatus: nextProps.updateGetRegisterListStatus,
        });
    }

    render() {
        let buttons = [
            {name:'新增',type:'primary',id:'addMemberBtn',actionFun:'addFun'},
            // {name:'批量删除',type:'primary',id:'deleteMemberBtn',actionFun:'deleteFun'}
        ];
        let columns = [
            {title: '页面id', dataIndex: 'sysName'},
            {title: '页面名称', dataIndex: 'sysCode'},
            {title: '页面链接', dataIndex: 'sysUrl'},
            {title: '页面背景图', dataIndex: 'test',render: (text) =>{
                    return <img style={{cursor:'pointer',height:'60px'}} src={text} />}},
            {title: '分享标题', dataIndex: 'sysUrl1'},
            {title: '分享描述', dataIndex: 'sysUrl2'},
            {title: '分享log', dataIndex: 'sysUrl2',render: (text) =>{
                    return <img style={{cursor:'pointer',height:'60px'}} src={text} />}},
            {
                title: '操作',
                dataIndex: 'edit',
                fixed: tableDataSource&&tableDataSource.length?'right':'none',
                render: (text, record) => {
                    return (
                        <div>
                            <Link to={'/activity-register-new?type=detail&id='+record.id}>详情</Link>
                            <Divider type="vertical"/>
                            <Link to={'/activity-register-new?type=edit&id='+record.id}>编辑</Link>
                            <Divider type={'vertical'}/>
                            <a onClick={()=>this._deleteFun(record)}>删除</a>
                        </div>
                    )
                }
            },
        ];
        let tableDataSource = this.props.RegisterList && this.props.RegisterList.registerListData;
        let pagination = this.props.RegisterList && this.props.RegisterList.registerListPage;
        return (
            <div>
                <CommonList
                    history={this.props.history}
                    getCommonList={this._getRegisterList}
                    filterData={filterData}
                    columns={columns}
                    tableDataSource={tableDataSource}
                    tableLoading={this.props.Fetch.spinning}
                    pagination={pagination}
                    showFilter={true}
                    buttons={buttons}
                    addFun={this._addFun}
                    showRowSelection={false}
                />
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
        return {RegisterList: state.RegisterList, Fetch: state.Fetch}
    },
    (dispatch) => bindActionCreators({...actions}, dispatch)
)(RegisterList);
