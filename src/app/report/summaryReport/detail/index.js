import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import {Divider} from 'antd';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import CommonList from '../../../components/list/index';
import * as actions from './index.action';
import * as Util from '../../../../util/';

var filterData = []
var columns = []

class ReportList extends Component {
    constructor(props) {
        super(props);

        this._getReportList = this._getReportList.bind(this);
        this._addFun = this._addFun.bind(this);
        this._handleReset = this._handleReset.bind(this);
        this._handleLevelChange = this._handleLevelChange.bind(this);

        this.state = {
            searchParams: {},
        }
    }

    _handleLevelChange(option,value){
        console.log(option,value);
        if(value!="undefined"){
            filterData.forEach((ele)=>{
                if(ele.id==option.nextField){
                    ele.data = [{name:value+'-1',id:value+'-1'},{name:value+'-2',id:value+'-2'}]
                } else if(option.relativeField.indexOf(ele.id)!=-1){
                    ele.data = []
                }
            })
        } else {
            filterData.forEach((ele)=>{
                if(option.relativeField.indexOf(ele.id)!=-1){
                    ele.data = []
                }
            })
        }
    }

    _addFun(){
        this.props.history.push('/config-report-new')
    }

    _handleReset(){
        filterData.forEach((ele)=>{
            delete ele.initialValue;
        })
        this.setState({})
    }

    //调接口获取列表
    _getReportList(params) {
        params.id = Util.getUrlArg('id');
        this.setState({searchParams: params});
        //等filterData获取之后再查询
        if(filterData.length>0){
            this.props.getReportList(params);
        }
    }


    componentWillUpdate(nextProps, nextState) {
        //列表获取回掉函数
        Util.fetchCallback({
            status: nextProps.ReportList.reportListStatus,
            code: nextProps.ReportList.reportListCode,
            message: nextProps.ReportList.reportListMessage,
            params: this.state.searchParams,
            updateStatus: nextProps.updateGetReportListStatus,
        });

        //列表表头
        Util.fetchCallback({
            status: nextProps.ReportList.reportColumnsStatus,
            code: nextProps.ReportList.reportColumnsCode,
            message: nextProps.ReportList.reportColumnsMessage,
            updateStatus: nextProps.updateGetReportColumnsStatus,
            successCallback:()=>{
                let data = nextProps.ReportList.reportColumnsData;
                columns = [
                    {title: '系统名称', dataIndex: 'sysName', width: 100},
                    {title: '系统code', dataIndex: 'sysCode', width: 100}
                ];
            }
        });

        //获取筛选项
        Util.fetchCallback({
            status: nextProps.ReportList.reportFilterStatus,
            code: nextProps.ReportList.reportFilterCode,
            message: nextProps.ReportList.reportFilterMessage,
            updateStatus: nextProps.updateGetReportFilterStatus,
            successCallback:()=>{
                filterData = [
                    {
                        id: 'sysName',
                        name: 'input',
                        type:'input'
                    },
                    {
                        id: 'status',
                        name: 'select',
                        type: 'select',
                        initialValue:2,
                        data:[{name:'test1',id:1},{name:'test2',id:2}]
                    },
                    {
                        id: 'startEndTime',
                        name: 'datepicker',
                        type: 'datepicker',
                        showTime:true,                     //是否可选时间，默认false
                        valueList:['time1','time2'],
                        dateFormat:'YYYY-MM-DD hh:mm:ss'  //以指定的dateFormat为主，默认'YYYY-MM-DD'，showTime true时为'YYYY-MM-DD hh:mm:ss',
                    },{
                        id:'cascader',
                        name: '树形结构',
                        type:'cascader',
                        valueList:['cascader1','cascader2','cascader3'],
                        data:[{
                            value: 'zhejiang',
                            label: 'Zhejiang',
                            children: [{
                                value: 'hangzhou',
                                label: 'Hangzhou',
                                children: [{
                                    value: 'xihu',
                                    label: 'West Lake',
                                }],
                            }],
                        }, {
                            value: 'jiangsu',
                            label: 'Jiangsu',
                            children: [{
                                value: 'nanjing',
                                label: 'Nanjing',
                                children: [{
                                    value: 'zhonghuamen',
                                    label: 'Zhong Hua Men',
                                }],
                            }],
                        }]
                    },
                    {
                        id:'level1',
                        type:'select',
                        name:'level1',
                        data:[{name:'level1-1',id:'1-1'},{name:'level1-2',id:'1-2'},{name:'level1-3',id:'1-3'}],
                        relativeField:['level2','level3'],
                        nextField:'level2',
                        levelSelect:true,
                        handleChange:(option,value)=>{
                            this._handleLevelChange(option,value)
                        }
                    },
                    {
                        id:'level2',
                        type:'select',
                        name:'level2',
                        relativeField:['level3'],
                        nextField:'level3',
                        levelSelect:true,
                        handleChange:(option,value)=>{
                            this._handleLevelChange(option,value)
                        }
                    },
                    {
                        id:'level3',
                        type:'select',
                        name:'level3'
                    },{
                        id: 'vendorRate',
                        name: 'number',
                        type:'number',
                        //value.replace(/[^-\d\.]/g,"") 可以输入负数
                        parse:value => value.replace(/[^\d.]/g,"").replace(/^\./g,"").replace(/\.{2,}/g,".").replace(".","$#$").replace(/\./g,"").replace("$#$",".").replace(/^(\-)*(\d+)\.(\d\d).*$/,'$1$2.$3'),
                        className:'block-div'
                    },
                ]

                let params = {}
                filterData.forEach((ele,index)=>{
                    if(Util.isNotNull(ele.initialValue)){
                        params[ele.id]=ele.initialValue;
                    }
                })
                params = Object.assign({},this.state.searchParams,params);
                this._getReportList(params)
            }
        });
    }

    componentDidMount(){
        this.props.getReportFilter();
        this.props.getReportColumns();
    }

    render() {
        let tableDataSource = this.props.ReportList && this.props.ReportList.reportListData;
        let pagination = this.props.ReportList && this.props.ReportList.reportListPage;
        return (
            <div>
                <div className={'page-title'}>优惠券报表</div>
                <CommonList
                    history={this.props.history}
                    getCommonList={this._getReportList}
                    filterData={filterData}
                    columns={columns}
                    tableDataSource={tableDataSource}
                    tableLoading={this.props.Fetch.spinning}
                    pagination={pagination}
                    showFilter={true}
                    handleReset={this._handleReset}
                    showRowSelection={false}
                />
            </div>
        );
    }
}

export default connect(
    (state) => {
        return {ReportList: state.ReportList, Fetch: state.Fetch}
    },
    (dispatch) => bindActionCreators({...actions}, dispatch)
)(ReportList);
