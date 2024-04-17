// App.js
import "./App.css";
import { useState } from "react";

const tempMusicData = [
  {
    id: 1,
    title: "Enegertic",
    artist: "Wannaone",
    genre: "Pop",
    albumArt:
      "https://lastfm.freetls.fastly.net/i/u/ar0/474cb08497eda77202e1924c07b8dd99.jpg",
  },
  {
    id: 2,
    title: "Beautiful",
    artist: "Wannaone",
    genre: "Pop",
    albumArt:
      "https://i.scdn.co/image/ab67616d0000b27323bd8b27aeb3ad6d4f4339c4",
  },
  {
    id: 3,
    title: "Light",
    artist: "Wannaone",
    genre: "Pop",
    albumArt:
      "https://cdns-images.dzcdn.net/images/cover/619d660e6155d5206960b3b7d4fd0583/200x200.jpg",
  },
  {
    id: 4,
    title: "Boomerang",
    artist: "Wannaone",
    genre: "Pop",
    albumArt:
      "https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/99c08eac-1777-4459-81b0-341be2da5190/dc54nlf-0abf8d5a-9cc9-4f27-8931-120717fb58e0.jpg/v1/fill/w_894,h_894,q_70,strp/wanna_one_i_p_u____i_promise_you_0_1_1_album_cover_by_lealbum_dc54nlf-pre.jpg?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7ImhlaWdodCI6Ijw9MTc3MyIsInBhdGgiOiJcL2ZcLzk5YzA4ZWFjLTE3NzctNDQ1OS04MWIwLTM0MWJlMmRhNTE5MFwvZGM1NG5sZi0wYWJmOGQ1YS05Y2M5LTRmMjctODkzMS0xMjA3MTdmYjU4ZTAuanBnIiwid2lkdGgiOiI8PTE3NzMifV1dLCJhdWQiOlsidXJuOnNlcnZpY2U6aW1hZ2Uub3BlcmF0aW9ucyJdfQ.XtpZzhlry8LksJmdVBQf87fFVtU8CZ5yPGVtY4oWL9k",
  },
  {
    id: 5,
    title: "Spring Breeze",
    artist: "Wannaone",
    genre: "Pop",
    albumArt:
      "https://upload.wikimedia.org/wikipedia/en/b/ba/Wanna_One_%E2%80%93_1%C2%B9%C2%B9%3D1_%28Power_of_Destiny%29.png",
  },
];

const tempPlaylist = [
  {
    id: 1,
    title: "Neneng B",
    artist: "Nik Makino",
    genre: "Rap",
    userRating: 5,
  },
  {
    id: 2,
    title: "Babaero",
    artist: "Hev Abi",
    genre: "Hiphop",
    userRating: 3,
  },
  {
    id: 3,
    title: "Alapaap",
    artist: "Eraserheads",
    genre: "OPM",
    userRating: 4,
  },
];

export function App() {
  const [musics, setMusics] = useState(tempMusicData);
  const [playlist, setPlaylist] = useState(tempPlaylist);
  const [query, setQuery] = useState("");
  const [sortCriteria, setSortCriteria] = useState("");

  const addMusic = (newMusic) => {
    const id = musics.length + 1;
    const musicWithId = { ...newMusic, id };
    setMusics([...musics, musicWithId]);
  };

  const addToPlaylist = (music) => {
    if (!playlist.some((item) => item.id === music.id)) {
      setPlaylist([...playlist, music]);
    } else {
      const confirmAdd = window.confirm(
        "This song is already in the playlist. Do you want to add it again?"
      );
      if (confirmAdd) {
        setPlaylist([...playlist, music]);
      }
    }
  };

  const removeFromPlaylist = (musicId) => {
    const updatedPlaylist = playlist.filter((music) => music.id !== musicId);
    setPlaylist(updatedPlaylist);
  };

  const clearMusic = () => {
    setMusics([]);
  };

  const clearPlaylist = () => {
    setPlaylist([]);
  };

  const clearSearch = () => {
    setQuery("");
  };

  const getTotalSongs = () => playlist.length;

  const handleSortChange = (e) => {
    setSortCriteria(e.target.value);
  };

  const filteredMusics = musics.filter((music) =>
    music.title.toLowerCase().includes(query.toLowerCase())
  );

  const sortedMusics = filteredMusics.sort((a, b) => {
    if (sortCriteria === "title") {
      return a.title.localeCompare(b.title);
    } else if (sortCriteria === "artist") {
      return a.artist.localeCompare(b.artist);
    } else if (sortCriteria === "genre") {
      return a.genre.localeCompare(b.genre);
    }
    return 0;
  });

  return (
    <div>
      <Main>
        <Box title="Add New Music">
          <AddMusicForm addMusic={addMusic} />
        </Box>
        <Box title="Music List">
          <div className="search-container">
            <input
              className="search"
              type="text"
              placeholder="Search music..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
            <NumResult numResults={sortedMusics.length} />
            <button className="clear-search" onClick={clearSearch}>
              Clear Search
            </button>
            <select onChange={handleSortChange} value={sortCriteria}>
              <option value="">Sort By</option>
              <option value="title">Title</option>
              <option value="artist">Artist</option>
              <option value="genre">Genre</option>
            </select>
          </div>
          <Music musics={sortedMusics} addToPlaylist={addToPlaylist} />
        </Box>
        <Box title="Playlist">
          <button className="clear-button" onClick={clearPlaylist}>
            Clear Playlist
          </button>
          <PlayList musics={playlist} removeFromPlaylist={removeFromPlaylist} />
        </Box>
      </Main>
    </div>
  );
}

function NavBar({ children, numResults }) {
  return (
    <div>
      <div className="search-container">
        <Search />
        <NumResult numResults={numResults} />
      </div>
      {children}
    </div>
  );
}

function Logo() {
  return <h1 style={{ textAlign: "center" }}>Music App</h1>;
}

function Search() {
  return null;
}

function NumResult({ numResults }) {
  return (
    <p>
      Found <strong>{numResults}</strong> results
    </p>
  );
}

function Music({ musics, addToPlaylist }) {
  const [addedToPlaylist, setAddedToPlaylist] = useState([]);

  const handleAddToPlaylist = (music) => {
    addToPlaylist(music);
    setAddedToPlaylist([...addedToPlaylist, music.id]);
  };

  return (
    <ul className="music-list">
      {musics.map((music) => (
        <li key={music.id} className="music-item">
          <div className="album-art-container">
            <img src={music.albumArt} alt={music.title} className="album-art" />
          </div>
          <div className="music-details">
            <div>
              <strong>{music.title}</strong>
            </div>
            <div>by {music.artist}</div>
            <div>({music.genre})</div>
          </div>
          <button onClick={() => handleAddToPlaylist(music)}>
            {addedToPlaylist.includes(music.id) ? "Added" : "Add to Playlist"}
          </button>
        </li>
      ))}
    </ul>
  );
}

function Box({ children, title }) {
  return (
    <div className="container">
      <h2>{title}</h2>
      {children}
    </div>
  );
}

function AddMusicForm({ addMusic }) {
  const [newMusic, setNewMusic] = useState({
    title: "",
    artist: "",
    genre: "",
    albumArt: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewMusic({ ...newMusic, [name]: value });
  };

  const handleAddMusic = () => {
    if (
      !newMusic.title ||
      !newMusic.artist ||
      !newMusic.genre ||
      !newMusic.albumArt
    ) {
      alert("Please fill in all fields");
      return;
    }

    addMusic(newMusic);
    setNewMusic({ title: "", artist: "", genre: "", albumArt: "" });
  };

  return (
    <div className="add-music-form">
      <input
        type="text"
        name="title"
        value={newMusic.title}
        placeholder="Title"
        onChange={handleInputChange}
      />
      <input
        type="text"
        name="artist"
        value={newMusic.artist}
        placeholder="Artist"
        onChange={handleInputChange}
      />
      <input
        type="text"
        name="genre"
        value={newMusic.genre}
        placeholder="Genre"
        onChange={handleInputChange}
      />
      <input
        type="text"
        name="albumArt"
        value={newMusic.albumArt}
        placeholder="Album Art URL"
        onChange={handleInputChange}
      />
      <button onClick={handleAddMusic}>Add Music</button>
    </div>
  );
}

function PlayList({ musics, removeFromPlaylist }) {
  const handleRemoveFromPlaylist = (musicId) => {
    removeFromPlaylist(musicId);
  };

  return (
    <div>
      <h2>Playlist Summary</h2>
      <p>Total Songs: {musics.length}</p>
      <ul className="playlist">
        {musics.map((music) => (
          <li key={music.id}>
            {music.title} by {music.artist}
            <button onClick={() => handleRemoveFromPlaylist(music.id)}>
              Remove from Playlist
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

function Main({ children }) {
  return <div className="container">{children}</div>;
}

export default App;
