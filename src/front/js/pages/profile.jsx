import React, { Fragment, useContext, useEffect, useState } from "react";
import { Context } from "../store/appContext";
import { Link, useParams } from "react-router-dom";

import ProfileCard from "../component/profileCard.jsx";
import DefaultCard from "../component/defaultCard.jsx";
import Comment from "../component/comment.jsx";
import { CommentForm } from "../component/commentForm.jsx";
import "../../styles/profile.scss";

export const Profile = () => {
  const { store, actions } = useContext(Context);

  const [myFavBeers, setMyFavBeers] = useState([]);
  const [myTastedBeers, setMyTastedBeers] = useState([]);
  const [profileCard, setProfileCard] = useState(null);
  const [myWishBeers, setMyWishBeers] = useState([]);
  const [reviews, setReviews] = useState([]);

  let params = useParams();

  useEffect(async () => {
    await actions.getProfileInfo(localStorage.getItem("user"));
    if (store.profileInfo.user_type) {
      let brewerie_id = localStorage.getItem("user_type_id");
      await actions.getBrewerieReviews(brewerie_id);
      console.log(store.storedBrewerieReviews);
    } else {
      await actions.getFavouriteBeer(localStorage.getItem("user_type_id"));
      await actions.getTastedBeer(localStorage.getItem("user_type_id"));
      await actions.getWishedBeer(localStorage.getItem("user_type_id"));
    }
  }, []);

  useEffect(() => {
    if (Object.keys(store.profileInfo).length != 0) {
      setProfileCard(
        <ProfileCard key={store.profileInfo.id} element={store.profileInfo} />
      );
    }
  }, [store.profileInfo]);

  useEffect(() => {
    if (store.profileInfo.user_type) {
      console.log("nothing to get");
    } else {
      if (store.tastedBeer.length != 0) {
        setMyTastedBeers(
          store.tastedBeer.slice(0, 4).map((tasted, index) => {
            return (
              <>
                <DefaultCard
                  key={Math.floor(Math.random() * 100)}
                  element={tasted}
                />
              </>
            );
          })
        );
      }
      if (store.favouriteBeer.length != 0) {
        setMyFavBeers(
          store.favouriteBeer.slice(0, 4).map((fav, index) => {
            return (
              <>
                <DefaultCard
                  key={Math.floor(Math.random() * 200)}
                  element={fav}
                />
              </>
            );
          })
        );
      }
      if (store.wishlist.length != 0) {
        setMyWishBeers(
          store.wishlist.slice(0, 4).map((wish, index) => {
            return (
              <>
                <DefaultCard
                  key={Math.floor(Math.random() * 300)}
                  element={wish}
                />
              </>
            );
          })
        );
      }
    }
  }, [store.tastedBeer, store.favouriteBeer, store.wishlist]);

  useEffect(async () => {
    if (store.storedBrewerieReviews.length != 0) {
      setReviews(
        store.storedBrewerieReviews.map((review, index) => {
          console.log(review);
          return <Comment key={index.toString()} element={review} />;
        })
      );
    }
  }, [store.storedBrewerieReviews]);

  return (
    <Fragment>
      {profileCard}
      {store.profileInfo.user_type ? (
        <>
          <div>MAPA</div>
          <div className="commentContainer">{reviews} </div>
          {!localStorage.getItem("logged") ? (
            <></>
          ) : store.profileInfo.user_type === true ? (
            <></>
          ) : (
            <div className="commentForm">
              <CommentForm />
            </div>
          )}
        </>
      ) : (
        <>
          <div className="container__cerveteca">
            <Link to={"/cerveteca"}>
              <p className="subtitle">Cerveteca</p>
            </Link>
            <div className="display__cards">{myTastedBeers}</div>
          </div>
          <div className="container__fav">
            <Link to={"/profile/:id/favourite"}>
              <p className="subtitle">Favoritas</p>
            </Link>
            <div className="display__cards">{myFavBeers}</div>
          </div>
          <div className="container__wish">
            <Link to={"/wishlist"}>
              <p className="subtitle">Pendientes</p>
            </Link>
            <div className="display__cards">{myWishBeers}</div>
          </div>
        </>
      )}
    </Fragment>
  );
};
