import { useState } from 'react';
import AdminHeader from '../../components/base/AdminHeader';
import TransactionActionDropdown from '../../components/dropdown/TransactionActionDropdown';

import './ListTransaction.css'

/**
 * TODO 1: Design List Transaction display/table.
 * TODO 2: Set up State and func for transaction activity.
 * TODO 3: Fetch Transaction from db.
 * TODO 4: Create date duration use startDate value as date, add 30 day and put to dueDate
 */

const ListTrasactions = () => {
  const [transactions, setTransactions] = useState(null)

  const loadTransactions = async () => { }

  const actionHandler = () => { alert('Action clicked.') }

  return (
    <>
      <AdminHeader />
      <div className='list-transaction'>
        <div className="transaction-table-wrapper">
          <div className="title">
            <h1>Incoming Transaction</h1>
          </div>
          <table className='transaction-table'>
            <thead>
              <tr>
                <th>No</th>
                <th>Users</th>
                <th>Bukti Transfer</th>
                <th>Remaining Active</th>
                <th>Status User</th>
                <th>Staus Payment</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>1</td>
                <td>Ikhsan</td>
                <td>bukti-tf.jpg</td>
                <td>25 Hari</td>
                <td>Active</td>
                <td>Approve</td>
                <td>
                  <TransactionActionDropdown id={1} actionHandler={actionHandler} />
                </td>
              </tr>
              <tr>
                <td>2</td>
                <td>Ron</td>
                <td>bukti-tf.jpg</td>
                <td>11 Hari</td>
                <td>Active</td>
                <td>Approve</td>
                <td>
                  <TransactionActionDropdown id={2} actionHandler={actionHandler} />
                </td>
              </tr>
              <tr>
                <td>3</td>
                <td>Ria</td>
                <td>bukti-tf.jpg</td>
                <td>0 Hari</td>
                <td>Inactive</td>
                <td>Cancel</td>
                <td>
                  <TransactionActionDropdown id={3} actionHandler={actionHandler} />
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </>
  )
}

export default ListTrasactions
