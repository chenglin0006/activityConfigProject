import React, {Component} from 'react';
import { Tree } from 'antd';

const TreeNode = Tree.TreeNode;

export default class CheckTree extends Component {
    constructor(props) {super(props);}
    state = {
        autoExpandParent: true,
        selectedKeys: [],
    }

    

    onExpand = (expandedKeys) => {
        console.log('onExpand', expandedKeys);
        this.props.handleExpand(expandedKeys);
        this.setState({
            autoExpandParent: false,
        });
    }

    onCheck = (checkedKeys) => {
        console.log('onCheck', checkedKeys);
        this.props.handleCheck(checkedKeys);
    }

    onSelect = (selectedKeys, info) => {
        console.log('onSelect', info);
        this.setState({ selectedKeys });
    }


    renderTreeNodes = (data) => {
        return data.map((item) => {
            if (item.children) {
                return (
                    <TreeNode title={item.title} key={item.key} dataRef={item}>
                        {this.renderTreeNodes(item.children)}
                    </TreeNode>
                );
            }
            return <TreeNode {...item} />;
        });
    }

    render() {

        
        const {checkable=true} = this.props;
        
        return (
            <Tree
                checkable = {checkable}
                onExpand={this.onExpand}
                expandedKeys={this.props.expandedKeys}
                autoExpandParent={this.state.autoExpandParent}
                onCheck={this.onCheck}
                checkedKeys={this.props.keys}
                onSelect={this.onSelect}
                selectedKeys={this.state.selectedKeys}
            >
                {this.renderTreeNodes(this.props.treeData)}
            </Tree>
        );
    }
}