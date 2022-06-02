import React from 'react';
import { useHistory } from 'react-router-dom';
import { useProfileContext } from '../context/ProfileContext';
import { useUser } from '../context/UserContext';
import { getProfile } from '../services/profile';
import { useEffect } from 'react';
import { getProfileCards } from '../services/cards';
import { Link, Route } from 'react-router-dom';
import styles from './Profile.css';
import { useCard } from '../context/cardsContext/cardsContext';

export default function Profile() {
  const { cards, setCards, loading, setLoading } = useCard();

  const history = useHistory();
  const { user } = useUser();
  // console.log('user.id', user.id);  returns mathching id
  const {
    firstName,
    setFirstName,
    lastName,
    setLastName,
    username,
    setUsername,
    bio,
    setBio,

    image,
    setImage,
  } = useProfileContext();

  const handleEditButtonClick = () => {
    history.push(`/profile/${user.id}/edit`);
  };
  const redirectToCreateCard = () => {
    history.replace(`/createCard`);
  };

  useEffect(() => {
    const fetchProfile = async () => {
      const data = await getProfile(user.id);
      // console.log(data); returns null
      setFirstName(data.first_name);
      setLastName(data.last_name);
      setUsername(data.username);
      setBio(data.bio);
      setImage(data.image);
    };
    fetchProfile();
  }, []);

  useEffect(() => {
    const fetchProfileCards = async () => {
      const data = await getProfileCards();
      setCards(data);
    };
    fetchProfileCards();
  }, []);

  return (
    <>
      <div>
        <h2>{username ? username : user.email}'s Profile</h2>
        <h3>
          {firstName} {lastName}
        </h3>
        <p>{bio}</p>
        <img src={image} height="150" />
        {/* /// removes image on refresh, needs to be changed to image// */}
      </div>
      <div>
        <h2>Your Personal Cards</h2>

        <div className={styles.cards}>
          {cards.map((card) => (
            <div key={card.id}>
              <Link to={`/profile/${card.id}`}>{card.name}</Link>
            </div>
          ))}
        </div>

        {/* <UserCards /> */}

        <button onClick={redirectToCreateCard}> Create Card</button>
      </div>

      <button onClick={handleEditButtonClick}>Edit Profile</button>
    </>
  );
}

//profile cards to be fetched and rendered here, they link to profile/id page for editing...
