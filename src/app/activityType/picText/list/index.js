import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import {Divider,Form} from 'antd';
import {filterData} from './filterData';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import CommonList from '../../../components/list/index';
import Dialog from '../../../../components/dialog/index'
import * as actions from './index.action';
import * as Util from '../../../../util/';
import Toast from "../../../../components/prompt/toast";

class PicTextList extends Component {
    constructor(props) {
        super(props);

        this._getPicTextList = this._getPicTextList.bind(this);
        this._addFun = this._addFun.bind(this);
        this._deleteFun = this._deleteFun.bind(this);

        this.state = {
            searchParams: {}
        }
    }

    _addFun(){
        this.props.history.push('/activity-picText-new')
    }

    _deleteFun(data){
        if(data.length==0){
            Toast.show('请选择要操作条目');
            return
        }
        Dialog.open({
            message: '',
            dialogWidth:'450px',
            showInputSelect:[
                {
                    type:'detail',
                    className:'sure-text',
                    id:'sureText',
                    value:'确定删除选中条目么？'
                },
            ],
            dialogButton: [
                {
                    text: '取消',
                    clickHandle: () => {
                        Dialog.close();
                    }
                },
                {
                    text: '确定',
                    type: 'primary',
                    clickHandle: () => {
                        let ids = [];
                        data.forEach((ele)=>{
                            ids.push(ele.id);
                        })
                        this.props.deletePicText(ids);
                    }
                }
            ]
        })
    }

    //调接口获取列表
    _getPicTextList(params) {
        params.deleted = 0;
        this.setState({searchParams: params});
        this.props.getPicTextList(params);
    }


    componentWillUpdate(nextProps, nextState) {
        //列表获取回掉函数
        Util.fetchCallback({
            status: nextProps.PicTextList.picTextListStatus,
            code: nextProps.PicTextList.picTextListCode,
            message: nextProps.PicTextList.picTextListMessage,
            params: this.state.searchParams,
            updateStatus: nextProps.updateGetPicTextListStatus,
        });

        //delete
        Util.fetchCallback({
            status: nextProps.PicTextList.deletePicTextStatus,
            code: nextProps.PicTextList.deletePicTextCode,
            message: nextProps.PicTextList.deletePicTextMessage,
            updateStatus: nextProps.updateDeletePicTextStatus,
            isShowToastSuccess: true,
            successText: '操作成功',
            successCallback: () => {
                Dialog.close();
                this._getPicTextList(this.state.searchParams)
            }
        });
    }

    render() {
        let buttons = [
            {name:'新增',type:'primary',id:'addMemberBtn',actionFun:'addFun'},
            {name:'批量删除',type:'primary',id:'deleteBtn',actionFun:'deleteFun'}
        ];
        let columns = [
            {title: '卡卷类型编码', dataIndex: 'couponType'},
            {title: '卡卷类型名称', dataIndex: 'couponTypeName'},
            {title: '财务编号', dataIndex: 'financeNum'},
            {title: '限制小票总额', dataIndex: 'limitTotal'},
            {title: '允许使用卡', dataIndex: 'allowUseCard',render:(text)=>{
                    return text==1?'允许':'不允许'
                }},
            {title: '是否退回', dataIndex: 'retreatFlag',render:(text)=>{
                    return text==1?'是':'否'
                }},
            {title: '是否匹配规则', dataIndex: 'useRule',render:(text)=>{
                    return text==1?'是':'否'
                }},
            {title: '是否总价规则', dataIndex: 'useTotalRule',render:(text)=>{
                    return text==1?'是':'否'
                }},
            {
                title: '操作',
                dataIndex: 'edit',
                width: 100,
                fixed: tableDataSource&&tableDataSource.length?'right':'none',
                render: (text, record) => {
                    return (
                        <div>
                            <Link to={'/activity-picText-new?type=detail&id='+record.id}>详情</Link>
                            <Divider type="vertical"/>
                            <Link to={'/activity-picText-new?type=edit&id='+record.id}>编辑</Link>
                        </div>
                    )
                }
            },
        ];
        let tableDataSource = this.props.PicTextList && this.props.PicTextList.picTextListData;
        let pagination = this.props.PicTextList && this.props.PicTextList.picTextListPage;
        return (
            <div>
                <CommonList
                    history={this.props.history}
                    getCommonList={this._getPicTextList}
                    filterData={filterData}
                    columns={columns}
                    tableDataSource={tableDataSource}
                    tableLoading={this.props.Fetch.spinning}
                    pagination={pagination}
                    showFilter={true}
                    buttons={buttons}
                    addFun={this._addFun}
                    deleteFun={this._deleteFun}
                />
            </div>
        );
    }
}

export default connect(
    (state) => {
        return {PicTextList: state.PicTextList, Fetch: state.Fetch}
    },
    (dispatch) => bindActionCreators({...actions}, dispatch)
)(PicTextList);
