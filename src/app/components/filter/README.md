Filter组件：后台管理系统查询条件设置，查询条件需要options由父组件传递到子组件
例如：
	options=[
		{
			id: '',
			name: '',
			type: '',
			isHidePleaseSelect: true|false,
			colSpan: 8,
			data: [
				{
					value: '',
					text: ''
				}
			]
		}
	]
options: PropTypes.array(PropTypes.object)

options数组中每个object中key意义:
	id: 必填，输入控件唯一标志（getFieldDecorator的第一个参数id)
	name: 搜索参数的解释（表单的左边label）
	type: 表单类型，默认情况下为text
	data: 当表单为下拉表时，data为下拉表的数据
	placeholder: 同antd design中的placeholder
	colSpan: 同antd-design中的col下span属性，默认为6
	isHidePleaseSelect: true|false

options.data: PropTypes.array(PropTypes.object)

options.data数组中每个object中key意义:
	默认情况下，下拉表会有一个值：<Option key="undefined" value="undefined">--请选择--</Option>，当value为-1时，请求数据时，不需要传递，不显示的话，你可以通过设置options.isHidePleaseSelect=true

	value: 用户选择后，需要传递的
	text: 用户看到的