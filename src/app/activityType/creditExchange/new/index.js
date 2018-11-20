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

const WrappedAdvancedNew=Form.create()(New);

class NewCredit extends Component {
    constructor(props) {
        super(props);
        this._refreshListFun = this._refreshListFun.bind(this);
        this.state = {
            id:0,
            type:'' //''==新建，detail=详情, edit=编辑
        }
    }

    _refreshListFun(list,id){
        newData.forEach((ele) => {
            if (ele.id == id) {
                ele.fileList = list;
            }
        })
    }

    componentDidMount(){
        let id = Util.getUrlArg('id')||0;
        let type = Util.getUrlArg('type');
        //编辑或者查看详情
        if(id){
            this.props.getDetailCredit({id});

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
                ele.disabled = false;
            })
        }
        this.setState({id:id,type:type})
    }

    componentWillUpdate (nextProps, nextState) {
        Util.fetchCallback({
            status: nextProps.NewCredit.addNewCreditStatus,
            code: nextProps.NewCredit.addNewCreditCode,
            message: nextProps.NewCredit.addNewCreditMessage,
            updateStatus: nextProps.updateAddNewCreditStatus,
            isShowDialog: true,
            successText: '操作成功',
            successCallback: () => {
                this.props.history.goBack();
            }
        });

        //获取详情初始值，并push到对应的newData中
        Util.fetchCallback({
            status: nextProps.NewCredit.getDetailCreditStatus,
            code: nextProps.NewCredit.getDetailCreditCode,
            message: nextProps.NewCredit.getDetailCreditMessage,
            updateStatus: nextProps.updateGetDetailCreditStatus,
            successCallback: () => {
                let data = nextProps.NewCredit.getDetailCreditData&&nextProps.NewCredit.getDetailCreditData[0];
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
            submitAlertInfo:{mainText:'确定保存Credit吗？'},
            clickHandle:(values)=>{
                if(this.state.id){
                    values.id = this.state.id;
                } else {
                    delete values.id;
                }
                this.props.addNewCredit(values);
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
                    detailData={this.state.id?this.props.NewCredit.getDetailCreditData:null}
                    history={this.props.history}
                    actionButtons = {actionButtons}
                    refreshListFun= {this._refreshListFun}
                />
                <Loader spinning={this.props.Fetch.spinning || false} />
            </div>
        );
    }
}

export default connect(
    (state) => {
        return {NewCredit: state.NewCredit, Fetch: state.Fetch}
    },
    (dispatch) => bindActionCreators({...actions}, dispatch)
)(NewCredit);

