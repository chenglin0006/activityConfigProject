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

class NewPicText extends Component {
    constructor(props) {
        super(props);
        this.refresh = this.refresh.bind(this);
        this.state = {
            id:0,
            type:'' //''==新建，detail=详情, edit=编辑
        }
    }

    refresh(data){
        newData.forEach((ele,index)=>{
            ele.data = data;
        })
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
        return (
            <div>
                <WrappedAdvancedNew
                    newData={newData}
                    //编辑页面传递detailData,创建页面不传递detailData
                    detailData={this.state.id?this.props.NewPicText.getDetailPicTextData:null}
                    history={this.props.history}
                    actionButtons = {actionButtons}
                    generateFun={this._generateFun}
                    refresh={this.refresh}
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

