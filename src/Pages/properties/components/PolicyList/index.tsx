import { useState } from 'react';

import { Button, Form, Input, InputNumber, List, Modal, Select, Space } from 'antd';
import { EditOutlined, RollbackOutlined, SaveOutlined } from '@ant-design/icons';

import type { IPropertyPolicy, PolicyType } from '../../../../Store/property/types';

interface PolicyListProps {
  type: PolicyType;
  data: Array<IPropertyPolicy>;
  onSave: (item: IPropertyPolicy) => void;
}

interface PolicyFieldType {
  description?: string;
  amount: number;
  chargeType: string;
  name: string;
}

interface CancellationFieldType extends PolicyFieldType {
  reference: string;
  days: number;
  hours: number;
}

const PolicyList: React.FC<PolicyListProps> = ({ type, data, onSave }: PolicyListProps) => {
  const [editingItem, setEditingItem] = useState<IPropertyPolicy | null>(null);

  const [form] = Form.useForm<IPropertyPolicy>();

  const referenceOptions = [
    { value: 'prior-to-arrival', label: 'Prior to arrival' },
    { value: 'after-booking', label: 'After booking' },
  ];

  const onEditClick = (item: IPropertyPolicy) => {
    form.setFieldsValue(item);
    setEditingItem(item);
  };

  const onModalClose = () => {
    setEditingItem(null);
  };

  const onSaveClick = () => {
    onSave({
      ...form.getFieldsValue(),
      id: (editingItem as IPropertyPolicy).id,
    });
    setEditingItem(null);
  };

  return (
    <>
      <List
        bordered
        dataSource={data}
        itemLayout="horizontal"
        renderItem={(item) => (
          <List.Item
            actions={[
              <Button icon={<EditOutlined />} onClick={() => onEditClick(item)}>
                Edit
              </Button>,
            ]}
          >
            <List.Item.Meta title={item.name} description={item.description} />
          </List.Item>
        )}
        rowKey="id"
      />

      <Modal
        title="Edit policy"
        open={!!editingItem}
        footer={[
          <Button
            key="reset"
            onClick={() => form.setFieldsValue(editingItem as IPropertyPolicy)}
            icon={<RollbackOutlined />}
          >
            Reset
          </Button>,
          <Button key="save" type="primary" onClick={onSaveClick} icon={<SaveOutlined />}>
            Save
          </Button>,
        ]}
        onCancel={onModalClose}
      >
        <Form form={form} layout="vertical" requiredMark="optional">
          <Form.Item<PolicyFieldType>
            label="Name"
            name="name"
            rules={[{ required: true, message: 'Please write a name for the policy!' }]}
          >
            <Input />
          </Form.Item>

          <Form.Item<PolicyFieldType> label="Description" name="description">
            <Input.TextArea showCount />
          </Form.Item>

          <Form.Item<PolicyFieldType>
            label="Charge amount"
            name="amount"
            rules={[{ required: true, message: 'Please input an amount!' }]}
          >
            <InputNumber
              addonBefore={
                <Form.Item name="chargeType" noStyle>
                  <Select>
                    <Select.Option value="percentage">Percentage</Select.Option>
                  </Select>
                </Form.Item>
              }
              formatter={(value) => `${value}%`}
              min={0}
              max={100}
            />
          </Form.Item>

          {type === 'cancellationPolicies' && (
            <>
              <Space>
                <Form.Item<CancellationFieldType> label="Days" name="days">
                  <InputNumber min={0} max={31} />
                </Form.Item>
                <Form.Item<CancellationFieldType> label="Hours" name="hours">
                  <InputNumber min={0} max={24} />
                </Form.Item>
              </Space>

              <Form.Item<CancellationFieldType>
                name="reference"
                label="Reference"
                rules={[{ required: true, message: 'Please input a reference type!' }]}
              >
                <Select>
                  {referenceOptions.map(({ label, value }) => (
                    <Select.Option key={value} value={value}>
                      {label}
                    </Select.Option>
                  ))}
                </Select>
              </Form.Item>
            </>
          )}
        </Form>
      </Modal>
    </>
  );
};

export default PolicyList;
