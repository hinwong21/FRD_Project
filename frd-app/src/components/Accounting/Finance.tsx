import { IonButton, IonContent, IonHeader, IonIcon, IonInput, IonItem, IonLabel, IonList, IonTitle, IonToolbar } from '@ionic/react';
import { add, remove } from 'ionicons/icons';
import React from 'react'
import { Link } from 'react-router-dom';
import style from './Finance.module.scss'

type Transaction = {
    id: number,
    type: string,
    amount: number
}
// type Genre = {
//     food: number | string,
//     drink: number | string,
//     transport: number | string,
//     entertainment: number | string,
//     bill: number | string,
//     consumption: number | string,
//     income: number | string,
//     medical: number | string,
//     electronic: number | string,

// }


const Finance: React.FC = () => {
    const [transactions, setTransactions] = React.useState<Transaction[]>([]);
    const [type, setType] = React.useState('');
    const [amount, setAmount] = React.useState<number>(0);
    const today = new Date(); // 获取当前时间
    const date = `${today.getFullYear()}-${(today.getMonth() + 1).toString().padStart(2, '0')}-${today.getDate().toString().padStart(2, '0')}`; // 格式化日期

    const handleAddTransaction = () => {
        const newTransaction: Transaction = {
            id: transactions.length + 1,
            type,
            amount
        };
        setTransactions([...transactions, newTransaction]);
        setType('');
        setAmount(0);
    }

    const handleRemoveTransaction = (id: number) => {
        const updatedTransactions = transactions.filter(transaction => transaction.id !== id);
        setTransactions(updatedTransactions);
    }

    const incomeTransactions = transactions.filter(transaction => transaction.type === 'income');
    const expenseTransactions = transactions.filter(transaction => transaction.type === 'expense');
    const totalIncome = incomeTransactions.reduce((total, transaction) => total + transaction.amount, 0);
    const totalExpense = expenseTransactions.reduce((total, transaction) => total + transaction.amount, 0);
    const balance = totalIncome - totalExpense;

    return (
        <>

            <IonList>
                <div className={style.date}><h1>{date}</h1></div> 
                <IonTitle><div className={style.title}>My Account</div> </IonTitle>
                <IonItem>
                    <div className={style.type}>
                    <IonLabel>Type</IonLabel>
                    <IonInput value={type} onIonChange={e => setType(e.detail.value!)}></IonInput>
                    </div> 
                </IonItem>
                <IonItem>
                    <IonLabel>Amount</IonLabel>
                    <IonInput type="number" value={amount} onIonChange={e => setAmount(parseFloat(e.detail.value!))}></IonInput>
                </IonItem>

            </IonList>
            <IonList>
                <div className={style.balance}>
                    <IonItem>
                        <IonLabel>Total Income: ${totalIncome.toFixed(2)}</IonLabel>
                    </IonItem>
                    <IonItem>
                        <IonLabel>Total Expense: ${totalExpense.toFixed(2)}</IonLabel>
                    </IonItem>
                    <IonItem>
                        <IonLabel>Balance: ${balance.toFixed(2)}</IonLabel>
                    </IonItem>
                </div>
            </IonList>
            <IonList>
                <IonItem>
                    <IonLabel>Income</IonLabel>
                </IonItem>
                {incomeTransactions.map(transaction => (
                    <IonItem key={transaction.id}>
                        <IonLabel>{transaction.type}: ${transaction.amount.toFixed(2)}</IonLabel>
                        <IonButton slot="end" onClick={() => handleRemoveTransaction(transaction.id)}>
                            <IonIcon slot="icon-only" icon={remove} />
                        </IonButton>
                    </IonItem>
                ))}
            </IonList>
            <IonList>
                <IonItem>
                    <IonLabel>Expenses</IonLabel>
                </IonItem>
                {expenseTransactions.map(transaction => (
                    <IonItem key={transaction.id}>
                        <IonLabel>{transaction.type}: ${transaction.amount.toFixed(2)}</IonLabel>
                        <IonButton slot="end" onClick={() => handleRemoveTransaction(transaction.id)}>
                            <IonIcon slot="icon-only" icon={remove} />
                        </IonButton>
                    </IonItem>
                ))}
            </IonList>
            <IonItem>
                <Link to="/page/Calculator"><IonButton onClick={handleAddTransaction}>
                    <IonIcon slot="start" icon={add} />
                    Add Transaction
                </IonButton></Link>
            </IonItem>
            <IonItem>
                <Link to="/page/Transaction"><IonButton onClick={handleAddTransaction}>
                    <IonIcon slot="start" icon={add} />
                    Review
                </IonButton></Link>
            </IonItem>
        </>
    );
}
export default Finance