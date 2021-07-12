import { useState, useEffect } from 'react';
import { API } from '../../config/api'

import AdminHeader from '../../components/base/AdminHeader';
import TransactionActionDropdown from '../../components/dropdown/TransactionActionDropdown';

import './ListTransaction.css'

const ListTrasactions = () => {
  const [transactions, setTransactions] = useState(null)
  let tableNum = 1;

  const myStyle = {
    redTxt: {
      color: '#FF0000'
    },
    greenTxt: {
      color: '#0ACF83'
    },
    yellowTxt: {
      color: '#F7941E'
    }
  };

  const loadTransactions = async () => {
    try {
      const SUCCESS = 200

      const response = await API.get('/transactions')

      if (response.status === SUCCESS) {
        let datas = response.data.data

        // Add remaining dates
        datas = datas.map(data => {
          // Get dates
          let currentDate = new Date()
          let destinationDate = data.dueDate

          // Split day, month & year as array
          const destinationDateArr = destinationDate.split('/')

          // Change date format
          currentDate = `${currentDate.getMonth()}/${currentDate.getDate()}/${currentDate.getFullYear()}`
          destinationDate = `${destinationDateArr[1]}/${destinationDateArr[0]}/${destinationDateArr[2]}`

          // Init date to calclulate
          const date1 = new Date(currentDate)
          const date2 = new Date(destinationDate)

          // Calculate time difference
          const DIFF_IN_TIME = date2.getTime() - date1.getTime()
          // Calclulate day difference
          const DIFF_IN_DAYS = DIFF_IN_TIME / (1000 * 3600 * 24)

          // Set remaining date
          const remainingDate = DIFF_IN_DAYS >= 0 && data.status === 'Approved' ? DIFF_IN_DAYS : 0;

          return {
            ...data,
            remainingDate
          }
        })

        setTransactions(datas)
      }
    } catch (err) {
      alert(err?.response?.data?.message)
    }
  }

  const actionHandler = async (paymentId, startDateStr, actionVal) => {
    try {
      const SUCCESS = 200

      const config = {
        headers: {
          "Content-type": "application/json"
        }
      }

      let status = ''
      let dueDate = ''

      if (actionVal !== '1') {
        // Init Request data
        status = 'Cancel'
        dueDate = startDateStr
      } else {
        // get Date
        const startDateArr = startDateStr.split('/')
        const dateStr = `${startDateArr[1]}/${startDateArr[0]}/${startDateArr[2]}`

        // Set up date
        const daysToAdd = 30
        const monthToAdd = 1
        let dateObj = new Date(dateStr)
        dateObj.setDate(dateObj.getDate() + daysToAdd)

        // Init Request data
        status = 'Approved'
        dueDate = `${dateObj.getDate()}/${dateObj.getMonth() + monthToAdd}/${dateObj.getFullYear()}`
      }

      const body = JSON.stringify({
        paymentId,
        dueDate,
        status
      })

      const response = await API.put("/transaction", body, config)

      if (response.status === SUCCESS) {
        alert('Update Success!')
        // Reload Transaction
        loadTransactions()
      }
    } catch (err) {
      alert(err?.response?.data?.message)
    }
  }

  useEffect(() => {
    loadTransactions()
  }, [])

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
              {transactions &&
                transactions.map((transaction, index) => (
                  <tr key={index}>
                    <td>{tableNum++}</td>
                    <td>{transaction.user.fullName}</td>
                    <td>{transaction.attache}</td>
                    <td>{`${transaction.remainingDate} Days`}</td>
                    <td
                      style={transaction.user.subscribe === 'true' ? myStyle.greenTxt : myStyle.redTxt}
                    >
                      {transaction.user.subscribe === 'true' ? 'Active' : 'Not Active'}
                    </td>
                    <td
                      style={(() => {
                        if (transaction.status === 'Approved') {
                          return myStyle.greenTxt
                        } else if (transaction.status === 'Pending') {
                          return myStyle.yellowTxt
                        } else {
                          return myStyle.redTxt
                        }
                      })()}
                    >
                      {transaction.status}
                    </td>
                    <td>
                      <TransactionActionDropdown
                        id={transaction.id}
                        startDate={transaction.startDate}
                        actionHandler={actionHandler}
                      />
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  )
}

export default ListTrasactions
