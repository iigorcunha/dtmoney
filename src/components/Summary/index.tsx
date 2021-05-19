import { Container } from "./styles";
import incomeImg from "../../assets/income.svg";
import outgoImg from "../../assets/outgo.svg";
import totalImg from "../../assets/total.svg";
import { useTransactions } from "../../hooks/useTransactions";

export function Summary () {

  const { transactions } = useTransactions();

  const summary = transactions.reduce((acc, transaction) => {
    if (transaction.type === 'deposit') {
      acc.deposits += transaction.value;
      acc.total += transaction.value;
    } else {
      acc.withdraws += transaction.value;
      acc.total -= transaction.value;
    }

    return acc;
  }, {
    deposits: 0,
    withdraws: 0,
    total: 0
  });
  

  return (
    <Container>
      <div>
        <header>
          <p>Incoming</p>
          <img src={incomeImg} alt="" />

        </header>
        <strong> {new Intl.NumberFormat('en-CA', {
                  style: 'currency',
                  currency: 'CAD'
                }).format(summary.deposits)}</strong>
      </div>
      <div>
        <header>
          <p>Outgoing</p>
          <img src={outgoImg} alt="" />

        </header>
        <strong>- {new Intl.NumberFormat('en-CA', {
                  style: 'currency',
                  currency: 'CAD'
                }).format(summary.withdraws)}</strong>
      </div>
      <div className="highlight-background">
        <header>
          <p>Total</p>
          <img src={totalImg} alt="" />

        </header>
        <strong>{new Intl.NumberFormat('en-CA', {
                  style: 'currency',
                  currency: 'CAD'
                }).format(summary.total)}</strong>
      </div>
    </Container>
  );
}