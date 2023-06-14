<template>
  <div class="about w infinite-list" v-infinite-scroll="load">
    <div class="article-con">
      <!-- <el-Card class="box-card infinite-list-item" v-for="item in articleList" :key="item.id">
        <div class="coloumns" @click="lookArticle(item.id)">
          <img src="@/assets/images/myblog.webp" alt="blog" />
          <div class="coloumns-text">
            <p>{{ item.title }}</p>
            <p class="coloumns-date">{{ item.date }}</p>
          </div>
        </div>
      </el-Card> -->
      <ul class="list-inline">
        <li class="book" v-for="item in articleList" :key="item.id" @click="lookArticle(item.id)">
          <img src="http://ecx.images-amazon.com/images/I/51oXKWrcYYL.jpg" />
          <div class="coloumns">
            <div class="coloumns-text">
              <p>{{ item.title }}</p>
            </div>
          </div>
          <p class="coloumns-date">{{ item.date }}</p>
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    "articleList": {
      type: Array,
      default: () => {
        return []
      }
    }
  },
  created() {
    if (this.$route.query.AritceId) {
      this.lookArticle(this.$route.query.AritceId)
    }
  },
  methods: {
    load() {
      this.$emit("loadList")
    },
    lookArticle(id) {
      this.$router.push({
        name: "Article", params: {
          id: id
        }
      })
    }
  }
}
</script>
<style lang="less" scoped>
.about {
  height: 600px;

  overflow-y: auto !important;

  /*滚动条样式*/
  &::-webkit-scrollbar {
    width: 0;
  }
}

@color-bg: #fde3a7;
@book-color-bg: lighten(@color-bg, 20%);
@book-color-border: lighten(#000, 85%);
@book-border: 1px solid @book-color-border;

// %book-rounded-corners {
//   border-top-right-radius: 5px;
//   border-bottom-right-radius: 5px;
// }

// LOL CSS
// body,
// html {
//   width: 100%;
//   height: 100%;
//   display: table;
//   text-align: center;
// }

// body {
//   background: #fde3a7;
// }

ul {
  display: table-cell;
  vertical-align: middle;
}

.list-inline {
  padding-left: 0;
  list-style: none;

  &>li {
    position: relative;
    display: inline-block;
    margin-top: 10px;
    margin-left: 2em;

    .coloumns {
      position: absolute;
      top: 50px;
      left: 0;
      width: 100%;
      padding: 5px 10px;
      overflow: hidden;
      text-align: center;
      background-color: rgb(242, 111, 111);
      font-size: 16px;
      font-weight: 700;
      color: #013049;
      -moz-box-orient: vertical;
      -webkit-line-clamp: 2;
      word-break: break-all;
      text-overflow: ellipsis;
      border-top-right-radius: 0;
      border-bottom-right-radius: 0;
      transform-origin: 0 50%;
      transform: rotateY(0);
      transition: all 0.45s ease;
    }

    .coloumns-date {
      width: 100%;
      position: absolute;
      bottom: 25px;
      text-align: center;
      font-size: 14px;
      font-weight: 700;

      transform-origin: 0 50%;
      transform: rotateY(0);
      transition: all 0.45s ease;
      background-color: #00a3be;
    }
  }

  // & > li:first-child {
  //   margin-left: 0;
  // }
}

.book {
  border-top-right-radius: 5px;
  border-bottom-right-radius: 5px;
  cursor: pointer;
  display: block;
  width: 200px;
  height: 300px;
  position: relative;
  background: @book-color-bg;
  z-index: 1;
  box-shadow: 0 2px 4px 0 rgba(#000, 0.1), 0 9px 20px 0 rgba(#000, 0.25);
  overflow: hidden;
  transition: box-shadow 0.3s linear;
}

.book img {
  border-top-right-radius: 5px;
  border-bottom-right-radius: 5px;
  width: inherit;
  height: inherit;
  transform-origin: 0 50%;
  transform: rotateY(0);
  transition: all 0.45s ease;
}

.book:hover {
  box-shadow: 0 2px 4px 0 rgba(#000, 0.25), 0 9px 20px 0 rgba(#000, 0.45);

  img {
    transform: rotateY(-25deg);
    box-shadow: 1px 1px 5px 5px rgba(#000, 0.2);
  }

  .coloumns,
  .coloumns-date {
    transform: rotateY(-25deg);
  }
}

.book::after,
.book::before {
  border-top-right-radius: 5px;
  border-bottom-right-radius: 5px;

  content: "";
  display: block;
  width: inherit;
  height: inherit;
  position: absolute;
  z-index: -1;
  top: 0;
  background: @book-color-bg;
  border: @book-border;
}

.book::before {
  left: -3px;
}

.book::after {
  left: -6px;
}

// .article-con {
//   display: flex;
//   justify-content: space-evenly;
//   flex-wrap: wrap;
//   width: 100%;

//   .box-card {
//     margin: 10px;
//     width: 380px;
//     cursor: pointer;

//     .coloumns {
//       position: relative;
//       min-height: 200px;

//       img {
//         width: 100%;
//       }

//       .coloumns-text {
//         padding: 10px;
//         position: absolute;
//         left: 0;
//         bottom: 0;
//         width: 100%;
//         // background-color: rgba(0, 0, 0, .2);
//         background-image: linear-gradient(
//           to bottom right,
//           rgb(100, 187, 225),
//           rgb(86, 236, 203),
//           rgb(116, 167, 235)
//         );

//         p {
//           font-weight: 700;
//           text-align: center;
//           color: #000;
//         }

//         .coloumns-date {
//           position: absolute;
//           top: -20px;
//           right: 5px;
//           font-size: 14px;
//           font-weight: 500;
//           color: #daa520;
//         }
//       }
//     }
//   }
// }
</style>
    