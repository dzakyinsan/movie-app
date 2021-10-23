import React, { useEffect, useState } from "react";
import { Modal, Space, AutoComplete } from "antd";
import moment from "moment";
import { useSelector, useDispatch } from "react-redux";
import { ScheduleOutlined, LikeOutlined } from "@ant-design/icons";
import "./App.css";
import "antd/dist/antd.css";
import { onGetMovieAction } from "./redux/action";
import Logo from "./assets/logo.png";

function App() {
  const [dataDetail, setDataDetail] = useState([]);
  const [search, setSearch] = useState("");
  const [searchValue, setSearchValue] = useState("");
  const [modalDetail, setModalDetail] = useState(null);
  const [filteredImage, setFilteredImage] = useState([]);
  const [page, setPage] = useState(1);
  const dispatch = useDispatch();
  const data = useSelector((state) => state.MovieReducer.movies);
  const loading = useSelector((state) => state.MovieReducer.loading);
  const error = useSelector((state) => state.MovieReducer.error);

  useEffect(() => {
    dispatch(onGetMovieAction(page));
    document.body.classList.add("body");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page]);

  useEffect(() => {
    setFilteredImage(data?.filter((val) => val.Title.toLowerCase().includes(search.toLowerCase())));
  }, [search, data]);

  window.onscroll = function () {
    if (window.innerHeight + document.documentElement.scrollTop === document.documentElement.scrollHeight) {
      scrollToEnd();
    }
  };

  const scrollToEnd = () => {
    setPage(page + 1);
  };

  const toggleModal = (val) => {
    setModalDetail(!modalDetail);
    setDataDetail(val);
  };

  const renderModalDetail = () => {
    return (
      <div style={{ position: "relative" }}>
        <img src={dataDetail.Poster} alt={dataDetail.Title} width="100%" height="100%" />
        <div className="detail-desc pl-2">
          <h2>{dataDetail.Title}</h2>
          <div className="d-flex">
            <p>
              <ScheduleOutlined />
            </p>
            <p className="schedule">{moment(dataDetail.Year).format("YYYY")}</p>
          </div>
          <div className="d-flex">
            <p>
              <LikeOutlined />
            </p>
            <p className="schedule">100</p>
          </div>
        </div>
      </div>
    );
  };

  const handleCancel = () => {
    setModalDetail(false);
  };

  const onSelect = (selected) => {
    setSearch(selected);
  };

  const onChangeSearch = (e) => {
    if (!e.length) {
      setSearchValue(e);
      setSearch(e);
    }
    setSearchValue(e);
  };

  const optionValue = () => {
    if (searchValue) {
      return data.filter((val) => val.Title.toLowerCase().includes(searchValue.toLowerCase()));
    }
  };

  if (loading || error.length) {
    return <div className="laoding-error">{error.length ? error : "Loading..."}</div>;
  }
  return (
    <div className="row main-container">
      <div className="navbar-container">
        <div className="row pt-3">
          <div className="col-6">
            <img src={Logo} alt="xxi logo" height="100px" />
          </div>
          <div className="d-flex justify-content-end col-6 pt-3 pr-5">
            <Space direction="hirozontal">
              <AutoComplete options={optionValue()} value={searchValue} style={{ width: 300 }} onSelect={onSelect} onChange={onChangeSearch} placeholder="Search Movie" className="autoinput" />
            </Space>
          </div>
        </div>
      </div>

      {filteredImage?.map((val) => (
        <div className="image col-md-4 col-sm-6" key={val.imdbId} onClick={() => toggleModal(val)}>
          <div id="zoom-In">
            <figure>
              <img src={val.Poster} alt={val.Title} />
              <div className="overlay">
                <div className="title">
                  <h2>{val.Title}</h2>
                </div>
              </div>
            </figure>
          </div>
        </div>
      ))}
      <Modal title="Movie Detail" className="modal-detail" visible={modalDetail} footer={null} onOk={handleCancel} onCancel={handleCancel}>
        {renderModalDetail()}
      </Modal>
    </div>
  );
}

export default App;
