import React, {Component} from 'react';
import {Table, Form, Button, Pagination,Upload,Icon} from 'antd';
import {Link} from 'react-router-dom';
import Filter from '../filter/index';
import * as Util from '../../../util/';
import './index.less';
import ModalForm from '../modalForm';
import moment from 'moment';

const WrappedAdvancedFilter = Form.create()(Filter);

class CommonList extends Component {
  constructor(props) {
    super(props);

    this._handleSearch = this._handleSearch.bind(this);
    this._handleReset = this._handleReset.bind(this);
    this._onChangePage = this._onChangePage.bind(this);
    this._onSelectChange = this._onSelectChange.bind(this);
    this._showTotal = this._showTotal.bind(this);
    this._isDatepicker = this._isDatepicker.bind(this);
    this.curPage = Util.getUrlArg('curPage') || 1;
    this.pageSize = Util.getUrlArg('pageSize') || 10;

    this.state = {
      curPage: this.curPage,
      pageSize: this.pageSize,
      searchParams: '',
      selectedRowKeys: [],
      selectedRows: [],
    }
  }

  _onChangePage(pagination) {
    let currentPage = pagination.current;
    let searchParams = this.state.searchParams;

    if (searchParams) {
      searchParams['curPage'] = currentPage;
    }
    //翻页操作时，改变当前页
    this.setState({
      curPage: currentPage,
      searchParams: searchParams
    });
    this.props.getCommonList(searchParams);
  }

  _handleReset() {
    this.setState({
      curPage: 1,
      searchParams: {
        curPage: 1,
        pageSize: this.state.pageSize
      }
    });
    this.props.getCommonList({
      curPage: 1,
      pageSize: this.state.pageSize
    });
    if(this.props.handleReset){
        this.props.handleReset();
    }
    this.setState({selectedRowKeys:[]})
  }

  _handleSearch(items) {
    let params = {
      curPage: 1,
      pageSize: this.state.pageSize
    }
      let filterData = this.props.filterData;
    //将items中有值的copy到params中
    for (let i in items) {
      if ((items[i] && items[i] !== 'undefined') || items[i] === 0) {
        if(Array.isArray(items[i])){
            for(let j=0; j<filterData.length; j++) {
                if(filterData[j].id === i) {
                    if(this._isDatepicker(items[i])) {
                        let dateFormat = 'YYYY-MM-DD';
                        if(filterData[j].showTime){
                            dateFormat = 'YYYY-MM-DD HH:mm:ss'
                        }
                        if(filterData[j].dateFormat){
                            dateFormat = filterData[j].dateFormat;
                        }
                        let valueList = filterData[j].valueList;
                        items[i].forEach((ele,index)=>{
                            params[valueList[index]] = moment(ele).format(dateFormat)
                        })
                    } else if(filterData[j].type=='cascader'){
                        let valueList = filterData[j].valueList;
                        valueList.forEach((ele,index)=>{
                          params[ele]=items[i][index];
                        })
                    } else {
                        params[i] = items[i];
                    }
                }
            }
        } else {
          params[i] = items[i];
        }
      }
      ;
    }
    this.setState({
      searchParams: params
    });
    this.props.getCommonList(params);
  }

  _onSelectChange(selectedRowKeys, selectedRows) {
    this.setState({selectedRowKeys, selectedRows});
  }

    _showTotal(total){
        return `共 ${total} 行`;
    }

    _isDatepicker(item) {
        if(Array.isArray(item) && item.length === 2) {
            return item.every((i) => moment.isMoment(i))
        }
    }

  componentWillMount() {
    //首次进入页面时，获取列表信息
    this.props.getCommonList&&this.props.getCommonList({
      curPage: this.state.curPage,
      pageSize: this.state.pageSize
    });


    //首次进入页面时，初始化搜索参数
    this.setState({
      searchParams: {
        curPage: this.state.curPage,
        pageSize: this.state.pageSize
      }
    });

    this.props.getCommonSelect && this.props.getCommonSelect();
  }

  render() {
    const {pagination,
        tableLoading,
        tableDataSource,
        showFilter,
        expandedRowRender,
        expandedRowRenderName,
        buttons,
        showRowSelection=true
    } = this.props;

    const rowSelection = {
      selectedRowKeys: this.state.selectedRowKeys,
      onChange: this._onSelectChange,
    };

    return (
      <div>
        {showFilter && <WrappedAdvancedFilter
            hideBackBtn={this.props.hideBackBtn}
            history={this.props.history}
          filterData={this.props.filterData}
          handleSearch={this._handleSearch}
          handleReset={this._handleReset}
          handleChange={this.props.handleChange}
          collapseNum={this.props.collapseNum}
          filterBtnInline={this.props.filterBtnInline}
        />
        }
        <div className='moreBtn'>
            {
                buttons&&buttons.map((ele,index)=>{
                    return(
                        ele.isUpload?
                            <Upload key={index} {...ele.uploadConfig} onChange={(e)=>{
                                ele.onChange(e)
                            }}>
                                <Button type={'primary'}>
                                    <Icon type="upload"/> {ele.btnText||'点击上传'}
                                </Button>
                            </Upload>:
                            <Button key={index} id={ele.id} type="primary" onClick={() => {
                                let list = [];
                                tableDataSource&&tableDataSource.forEach((ele)=>{
                                    this.state.selectedRowKeys.forEach((item)=>{
                                        if(ele.id===item){
                                            list.push(ele);
                                        }
                                    })
                                })
                                this.setState({selectedRows:list},()=>{
                                    this.props[ele.actionFun](this.state.selectedRows);
                                });
                                // this.setState({selectedRowKeys:[]});
                            }}>{ele.name}</Button>
                    )
                })
            }
        </div>
        <Table
            rowClassName={(record, index) => !record[expandedRowRenderName] ? 'hide-expand-btn' : ''}
          rowSelection={showRowSelection?rowSelection:null}
          columns={this.props.columns}
          dataSource={tableDataSource}
          rowKey={(item) => item.id}
          loading={tableLoading}
          onChange={this._onChangePage}
          expandedRowRender={expandedRowRender}
          pagination={{
            position: 'bottom',
            showQuickJumper: true,
            defaultCurrent: 1,
            current: pagination ? pagination.curPage : '',
            total: pagination ? pagination.totalNum : '',
              showTotal:this._showTotal,
              pageSize:pagination&&pagination.pageSize|| this.pageSize
          }}
          scroll={this.props.scroll}
        />
      </div>
    );
  }
}

CommonList.propTypes = {}

export default CommonList;
