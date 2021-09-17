import React, { Component } from "react";
import DiscoverBlock from "./DiscoverBlock/components/DiscoverBlock";
import "../styles/_discover.scss";
import axios from "axios";
import api from "../../../config";

const API_ROOT = api.api.baseUrl; // extracting baseUrl of api from api object
localStorage.setItem("token", api.api.AuthToken); // storing token in local storage

export default class Discover extends Component {
  constructor() {
    super();

    this.state = {
      newReleases: [],
      playlists: [],
      categories: [],
    };
  }

  //calling functions in componentDidMount which results in API calls

  componentDidMount() {
    this.fetchReleased();
    this.fetchFeaturedPlaylist();
    this.fetchCategories();
  }

  // function for fetching released albums

  fetchReleased = async () => {
    let token = localStorage.getItem("token"); //getting token from localStorage

    // using axios library to fetch data
    const response = await axios({
      method: "get",
      url: `${API_ROOT}/browse/new-releases?country=IN&limit=50&offset=6`, //passing the value of API_ROOT using  string literal
      headers: {
        "content-type": "application/json",
        Authorization: `Bearer ${token}`, // Passing Authentication token that we got from localStorage
      },
    });

    const data = response.data;

    //setting the data to state using setState
    this.setState({
      newReleases: data.albums.items,
    });
  };

  //function for fetching featured playlist

  fetchFeaturedPlaylist = async () => {
    let token = localStorage.getItem("token"); //getting token from localStorage
    const response = await axios({
      method: "get",
      url: `${API_ROOT}/browse/featured-playlists?country=IN&limit=50&offset=6`, //passing the value of API_ROOT using  string literal
      headers: {
        "content-type": "application/json",
        Authorization: `Bearer ${token}`, // Passing Authentication token that we got from localStorage
      },
    });
    const data = response.data;

    //setting the data to state using setState
    this.setState({
      playlists: data.playlists.items,
    });
  };

  //function for fetching categories

  fetchCategories = async () => {
    let token = localStorage.getItem("token"); //getting token from localStorage
    const response = await axios({
      method: "get",
      url: `${API_ROOT}/browse/categories`, //passing the value of API_ROOT using  string literal
      headers: {
        "content-type": "application/json",
        Authorization: `Bearer ${token}`, // Passing Authentication token that we got from localStorage
      },
    });

    const data = response.data;

    //setting the data to state using setState
    this.setState({
      categories: data.categories.items,
    });
  };

  render() {
    const { newReleases, playlists, categories } = this.state;
    return (
      <div className="discover">
        <DiscoverBlock
          text="RELEASED THIS WEEK"
          id="released"
          data={newReleases}
        />
        <DiscoverBlock
          text="FEATURED PLAYLISTS"
          id="featured"
          data={playlists}
        />
        <DiscoverBlock text="BROWSE" id="browse" data={categories} />
      </div>
    );
  }
}
