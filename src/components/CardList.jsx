import { useEffect } from 'react';
import { Link, Route } from 'react-router-dom';
import { useCard } from '../context/cardsContext/cardsContext';
import { getCards } from '../services/cards';
import CardView from '../views/CardView';
import Card from './Card';
import styles from '../components/CardList.css';

export default function CardList() {
  const { cards, setCards, loading, setLoading } = useCard();

  useEffect(() => {
    const getData = async () => {
      const data = await getCards();
      setCards(data);
      console.log('data', data);
      setLoading(false);
    };
    getData();
  }, []);
  if (loading) return <div>loading</div>;

  return (
    <>
      <div className={styles.cardList}>
        {cards.map((card) => (
          <Card key={card.id} card={card} />
        ))}
      </div>
      {/* <Route path="/:id">
        <CardView cards={cards} />
      </Route> */}
    </>
  );
}
