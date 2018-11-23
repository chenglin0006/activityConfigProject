import React, {Component} from 'react';
import {Form} from 'antd';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as actions from './index.action';
import New from '../../../components/new/index';
import * as Util from '../../../../util/';
import Loader from '../../../../components/loader/';
import Toast from "../../../../components/prompt/toast";
import './index.less'
import Sortable from 'sortablejs'

var leftList = [{type:'input',text:'input'},{type:'img',text:'img'}];
var rightList = [{type:'input',text:'input'}];
var rightValueList= [];
var selectDragItem = {}
class NewDrag extends Component {
    constructor(props) {
        super(props);
        this.state = {
            id:0,
            type:'' //''==新建，detail=详情, edit=编辑
        }
    }

    componentDidMount(){
        var aList =Sortable.create(A, {
            animation: 200,
            group: {
                name: "shared",
                pull: "clone",
                put:false,
                revertClone: true,
            },
            sort: false
        });

        var bList = Sortable.create(B, {
            group: {
                name:'shared',
                pull:true,
            },
            sort: true,
            filter: '.js-remove',
            onFilter:  (evt)=> {
                var parentNode = evt.item.parentNode;
                parentNode.removeChild(evt.item);
                rightValueList = [];
                for(var i=0, len=parentNode.children.length; i<len; i++){
                    let obj = {
                        type:parentNode.children[i].getAttribute('type'),
                        id:parentNode.children[i].getAttribute('data-id')
                    }
                    rightValueList.push(obj);
                }
                console.log(rightValueList);
                this.setState({})
            },
            onChoose:(evt)=>{
                console.log('onChoose')
                selectDragItem = {
                    type:evt.item.getAttribute('type'),
                    id:evt.item.getAttribute('data-id'),
                }
                this.setState({});
            },
            onRemove:(evt)=> {
                console.log('remove')
            },
            onUpdate:(evt)=> {
                console.log('update')
                rightValueList = [];
                for(var i=0, len=evt.to.children.length; i<len; i++){
                    let obj = {
                        type:evt.to.children[i].getAttribute('type'),
                        id:evt.to.children[i].getAttribute('data-id')
                    }
                    rightValueList.push(obj);
                }
                console.log(rightValueList);
                this.setState({})
            },
            onAdd:(evt)=>{
                console.log('add');
                evt.item.setAttribute('data-id',parseInt(Math.random()*1000))
                rightValueList = [];
                for(var i=0, len=evt.to.children.length; i<len; i++){
                    let obj = {
                        type:evt.to.children[i].getAttribute('type'),
                        id:evt.to.children[i].getAttribute('data-id')
                    }
                    rightValueList.push(obj);
                }
                console.log(rightValueList);
                this.setState({})
            }
        });
    }

    componentWillUpdate (nextProps, nextState) {

    }

    render() {
        return (
            <div className={'create-activity-div'}>
                <div className={'left-div'}>
                    <div id="A" className="list-group">
                        {leftList&&leftList.map((ele,index)=>{
                            return <div key={index}  className="list-group-item" type={ele.type}><i className="js-remove">✖</i>{ele.text}</div>
                        })}
                    </div>

                </div>
                <div className={'middle-div'}>

                    <div id="B" className="list-group">
                        {rightList&&rightList.map((ele,index)=>{
                            return <div key={index} className="list-group-item"  type={ele.type}>{ele.text}</div>
                        })}
                    </div>
                </div>
                <div className={'right-div'}>
                    {
                        rightValueList&&rightValueList.map((ele)=>{
                            if(ele.type=='input'){
                                return <span className={'input-drag-item '+(selectDragItem.id==ele.id?'':'hide')} data-id={ele.id}>{ele.type}-{ele.id}</span>
                            } else if (ele.type=='img'){
                                return <span className={'img-drag-item '+(selectDragItem.id==ele.id?'':'hide')} data-id={ele.id}>{ele.type}-{ele.id}</span>
                            }
                        })
                    }
                </div>
            </div>
        );
    }
}

export default connect(
    (state) => {
        return {NewDrag: state.NewDrag, Fetch: state.Fetch}
    },
    (dispatch) => bindActionCreators({...actions}, dispatch)
)(NewDrag);

