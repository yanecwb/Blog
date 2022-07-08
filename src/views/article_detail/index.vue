<template>
  <div class="w-full h-aotu" style="background-color: #f4f8fb" @click="()=>{showexpression = false;return false}">
    <iframe
      frameborder="0"
      scrolling="no"
      src="http://47.107.243.60:5005/colokBanner.html"
      class="w-full"
      height="800px"
    ></iframe>
    <div class=" w-screen md:w-1/2 mx-auto flex justify-center py-2">
     <span class="px-5 cursor-pointer">
        <svg @click="shareSpace('qq')" t="1656482100056" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="5164" width="30" height="30"><path d="M511.037 986.94c-85.502 0-163.986-26.686-214.517-66.544-25.66 7.149-58.486 18.655-79.202 32.921-17.725 12.202-15.516 24.647-12.32 29.67 14.027 22.069 240.622 14.092 306.04 7.219v-3.265z" fill="#FAAD08" p-id="5165"></path><path d="M495.627 986.94c85.501 0 163.986-26.686 214.518-66.544 25.66 7.149 58.485 18.655 79.203 32.921 17.724 12.202 15.512 24.647 12.32 29.67-14.027 22.069-240.623 14.092-306.042 7.219v-3.265z" fill="#FAAD08" p-id="5166"></path><path d="M496.137 472.026c140.73-0.935 253.514-27.502 291.73-37.696 9.11-2.432 13.984-6.789 13.984-6.789 0.032-1.25 0.578-22.348 0.578-33.232 0-183.287-88.695-367.458-306.812-367.47C277.5 26.851 188.8 211.021 188.8 394.31c0 10.884 0.55 31.982 0.583 33.232 0 0 3.965 4.076 11.231 6.048 35.283 9.579 150.19 37.482 294.485 38.437h1.037z m387.364 154.941c-8.66-27.825-20.484-60.273-32.455-91.434 0 0-6.886-0.848-10.366 0.158-107.424 31.152-237.624 51.006-336.845 49.808h-1.026c-98.664 1.186-227.982-18.44-335.044-49.288-4.09-1.176-12.168-0.677-12.168-0.677-11.97 31.16-23.793 63.608-32.453 91.433-41.3 132.679-27.92 187.587-17.731 188.818 21.862 2.638 85.099-99.88 85.099-99.88 0 104.17 94.212 264.125 309.947 265.596a765.877 765.877 0 0 1 5.725 0c215.738-1.471 309.947-161.424 309.947-265.595 0 0 63.236 102.519 85.102 99.88 10.186-1.231 23.566-56.14-17.732-188.819" p-id="5167"></path><path d="M429.208 303.911c-29.76 1.323-55.195-32.113-56.79-74.62-1.618-42.535 21.183-78.087 50.95-79.417 29.732-1.305 55.149 32.116 56.765 74.64 1.629 42.535-21.177 78.08-50.925 79.397m220.448-74.62c-1.593 42.507-27.03 75.941-56.79 74.62-29.746-1.32-52.553-36.862-50.924-79.397 1.614-42.526 27.03-75.948 56.764-74.639 29.77 1.33 52.57 36.881 50.951 79.417" fill="#FFFFFF" p-id="5168"></path><path d="M695.405 359.069c-7.81-18.783-86.466-39.709-183.843-39.709h-1.045c-97.376 0-176.033 20.926-183.842 39.709a6.66 6.66 0 0 0-0.57 2.672c0 1.353 0.418 2.575 1.072 3.612 6.58 10.416 93.924 61.885 183.341 61.885h1.045c89.416 0 176.758-51.466 183.34-61.883a6.775 6.775 0 0 0 1.069-3.622 6.66 6.66 0 0 0-0.567-2.664" fill="#FAAD08" p-id="5169"></path><path d="M464.674 239.335c1.344 16.946-7.87 32-20.55 33.645-12.701 1.647-24.074-10.755-25.426-27.71-1.326-16.954 7.873-32.008 20.534-33.64 12.722-1.652 24.114 10.76 25.442 27.705m77.97 8.464c2.702-4.392 21.149-27.488 59.328-19.078 10.028 2.208 14.667 5.457 15.646 6.737 1.445 1.888 1.84 4.576 0.375 8.196-2.903 7.174-8.894 6.979-12.217 5.575-2.144-0.907-28.736-16.948-53.232 6.99-1.685 1.648-4.7 2.212-7.558 0.258-2.856-1.956-4.038-5.923-2.342-8.678" p-id="5170"></path><path d="M503.821 589.328h-1.031c-67.806 0.802-150.022-8.004-229.638-23.381-6.817 38.68-10.934 87.294-7.399 145.275 8.928 146.543 97.728 238.652 234.793 239.996h5.57c137.065-1.344 225.865-93.453 234.796-239.996 3.535-57.986-0.584-106.6-7.403-145.283-79.631 15.385-161.861 24.196-229.688 23.389" fill="#FFFFFF" p-id="5171"></path><path d="M310.693 581.35v146.633s69.287 13.552 138.7 4.17V596.897c-43.974-2.413-91.4-7.79-138.7-15.546" fill="#EB1C26" p-id="5172"></path><path d="M806.504 427.238s-130.112 43.08-302.66 44.309h-1.025c-172.264-1.224-302.217-44.161-302.66-44.309L156.58 541.321c108.998 34.464 244.093 56.677 346.238 55.387l1.024-0.002c102.152 1.297 237.226-20.917 346.24-55.385l-43.579-114.083z" fill="#EB1C26" p-id="5173"></path></svg>
      </span>
      <span class="px-5 cursor-pointer">
        <svg @click="shareSpace('kj')" t="1656318782892" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2494" width="30" height="30"><path d="M648.64 366.4S538.56 87.36 512 87.36 375.36 366.4 375.36 366.4 80 387.52 70.08 411.2s220.96 217.28 220.96 217.28-68.16 293.76-52.16 306.72S512 790.4 512 790.4s256 163.04 273.28 144.8c12.8-13.28-20.16-166.56-39.52-251.2a148 148 0 0 1 29.28-8.32 78.4 78.4 0 0 0 25.6-9.44s-61.44 13.92-241.92 17.76-231.36-5.12-231.36-5.12l254.4-190.88s-79.04-14.56-139.04-20c-85.92-7.84-161.12-7.68-151.68-10.08A1320.32 1320.32 0 0 1 512 448a1475.84 1475.84 0 0 1 184.96 20.16L442.72 650.88s55.52 8.48 101.6 10.4c87.84 3.36 195.04 0.8 194.88 0-3.36-14.08-6.24-32-6.24-32S962.24 434.88 954.08 411.2s-305.44-44.8-305.44-44.8z" fill="#F5BE3F" p-id="2495"></path></svg>
      </span>
      <div class="px-5 relative cursor-pointer">
        <svg @click="()=>{
          shoeqrcode = !shoeqrcode
            if(shoeqrcode){
            $nextTick(()=>{
              createQrcode()
            })}
          }" t="1656318853875" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="4634" width="30" height="30"><path d="M669.3 369.4c9.8 0 19.6 0 29.4 1.6C671 245.2 536.9 152 383.2 152 211.6 152 71 269.7 71 416.8c0 85 45.8 156.9 124.2 210.9l-31.1 93.2L273.6 667c39.2 8.2 70.3 16.3 109.5 16.3 9.8 0 19.6 0 31.1-1.6-6.5-21.3-9.8-42.5-9.8-65.4 0.1-135.7 116.2-246.9 264.9-246.9z m-168.4-85c24.5 0 39.2 16.3 39.2 39.2 0 22.9-16.3 39.2-39.2 39.2-24.5 0-47.4-16.4-47.4-39.2 0-24.5 24.6-39.2 47.4-39.2z m-216.3 73.1c-24.7 0-47.8-16.2-47.8-38.8 0-24.3 24.7-38.8 47.8-38.8s39.5 16.2 39.5 38.8c0.1 22.7-16.4 38.8-39.5 38.8z" fill="#24DB5A" p-id="4635"></path><path d="M953.8 613c0-125.9-124.2-227.2-264.8-227.2-148.8 0-266.5 103-266.5 227.2 0 125.9 117.7 227.2 266.5 227.2 31.1 0 62.1-8.2 93.2-16.3l85 47.4-22.9-78.5c62.1-47.4 109.5-109.5 109.5-179.8z m-351.5-39.2c-14.7 0-31.1-14.7-31.1-31.1 0-14.7 16.3-31.1 31.1-31.1 22.9 0 39.2 16.3 39.2 31.1 0 16.4-14.7 31.1-39.2 31.1z m178-7.6c-14.8 0-31.3-14.6-31.3-30.7 0-14.6 16.5-30.7 31.3-30.7 23.1 0 39.5 16.2 39.5 30.7 0 16.2-16.4 30.7-39.5 30.7z" fill="#24DB5A" p-id="4636"></path></svg>
        <div class="absolute -left-4"  ref="qrcode" v-if="shoeqrcode"></div>
      </div>
      <span class="px-5 cursor-pointer">
        <svg t="1656318884148" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="5506" width="30" height="30"><path d="M676.16 232.48s113.28-12 161.44 58.24 27.36 158.56 27.36 158.56a21.92 21.92 0 0 0 22.56 26.08h11.2A30.4 30.4 0 0 0 928 449.12s26.08-138.56-54.4-215.68c-62.72-60.32-148.64-66.88-183.04-66.88h-15.2a27.04 27.04 0 0 0-26.4 26.88v13.12a25.6 25.6 0 0 0 27.2 25.92zM453.12 758.08c79.04-16 132.48-81.92 119.52-148.64-11.2-57.44-67.84-96-133.76-96a163.52 163.52 0 0 0-32 3.2c-79.04 16-132.48 81.92-119.52 148.64s86.88 108.16 165.76 92.8z m2.24-171.68A24.64 24.64 0 1 1 432 611.04a24.48 24.48 0 0 1 23.36-24.64zM368 624.96c24.32-11.36 51.04-5.6 59.52 12.96s-3.52 42.72-27.52 54.08a60.96 60.96 0 0 1-25.12 5.76 36 36 0 0 1-34.4-18.88c-8.96-18.4 3.68-42.56 27.52-53.92z" fill="#F56467" p-id="5507"></path><path d="M467.52 857.44c208 0 374.4-110.24 374.4-246.4 0-114.88-141.76-114.88-141.76-122.4s70.72-74.08 0-115.68c-42.24-24.96-105.6-12.16-148.8 0a330.24 330.24 0 0 1-47.04 14.4c55.68-97.12-23.68-128-64-128-96 0-348.64 214.88-348.64 350.88s168.16 247.2 375.84 247.2z m-34.4-392.64c132.64-18.72 250.24 37.28 262.56 124.8s-85.28 173.76-218.08 192a365.28 365.28 0 0 1-50.72 3.52c-110.72 0-200.96-52.16-211.68-128-12.32-87.52 85.28-173.76 217.92-192.32z" fill="#F56467" p-id="5508"></path><path d="M780.64 444.16h16a21.44 21.44 0 0 0 20.64-17.44s18.88-73.12-24.96-113.12a111.04 111.04 0 0 0-75.84-28.16 108.32 108.32 0 0 0-25.28 2.56 21.12 21.12 0 0 0-17.44 20.16v6.88a16 16 0 0 0 17.92 16.8s48-6.56 71.36 21.6 5.12 73.76 5.12 73.76a12.32 12.32 0 0 0 12.48 16.96z" fill="#F56467" p-id="5509"></path></svg>
      </span>
    </div>
    <div
      class="w-full lg:w-3/5 md:mt-10 pt-1 mx-auto border-4 border-light-blue-500 border-opacity-100 bg-white shadow-2xl rounded-b-3xl"
    >
      <div
        class="text-xl md:text-2xl lg:text-3xl font-bold md:px-1 mt-3 md:mt-0"
      >
        {{ article.article_title }}
      </div>
      <div class="w-full flex justify-between items-center my-3 shadow-sm">
        <div class="w-8 h-8 md:w-10 md:h-10 lg:w-12 lg:h-12 rounded-full" :style="{backgroundImage:`url(${article.uper?article.uper.avatarUrl : ''})`,backgroundSize:'100% 100%'}">
        </div>
        <div class="felx justify-start items-start flex-grow text-xs ml-1 md:ml-3 lg:ml-5">
          <p class="m-0 text-black md:text-base">{{ article.uper ?  article.uper.nickname : '' }}</p>
          <p class="m-0 w-48 md:w-72 lg:w-full overflow-hidden whitespace-nowrap overflow-ellipsis">
            {{ format_publishTime(article.publish_time) }} 阅读{{article.readCount}}
          </p>
        </div>
        <Tooltip>
          <template slot="title">
            {{
                article.userId == $store.state.userInfo.userInfo.id
                  ? tip
                  : "谢谢喜欢 🤪"
            }}
          </template>
          <button class="follows text-xs md:text-base" @click="followsAuthor">
            <span class="button-content">
              关注
              <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path d="M0 0H24V24H0z" fill="none"></path>
                <path
                  d="M12.001 4.529c2.349-2.109 5.979-2.039 8.242.228 2.262 2.268 2.34 5.88.236 8.236l-8.48 8.492-8.478-8.492c-2.104-2.356-2.025-5.974.236-8.236 2.265-2.264 5.888-2.34 8.244-.228z"
                  fill="currentColor"></path>
              </svg>
            </span>
          </button>
        </Tooltip>
      </div>
      <div v-html="article.content" class="px-3 md:px-18 w-full"></div>
      <div class="w-full flex justify-between">
        <div class="p-4 w-1/4 md:w-1/5 flex justify-between items-center text-gray ">
          <div @click="likeIt" title="点个赞😘" class=" relative">
          <svg v-if="special" t="1657294617925" class="icon absolute left-2 -top-2 animate__fadeOutUp animate__animated " viewBox="0 0 1221 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2285" width="10" height="10"><path d="M1204.814491 122.670376l-104.202498-9.819364a18.026592 18.026592 0 0 1-14.655767-11.138382L1048.290907 11.139994a17.880035 17.880035 0 0 0-33.122032 0l-37.079088 90.572636a17.586919 17.586919 0 0 1-14.655767 11.138382l-104.349055 9.819364a18.026592 18.026592 0 0 0-10.112479 31.363339l78.554907 69.028659a17.733477 17.733477 0 0 1 5.715749 17.58692L908.91457 337.084236a18.026592 18.026592 0 0 0 26.673495 19.638727l86.908693-51.002067a17.586919 17.586919 0 0 1 18.173151 0L1128.751064 357.162636A18.026592 18.026592 0 0 0 1154.69177 337.084236l-23.302668-96.874615a17.733477 17.733477 0 0 1 5.715749-17.58692l78.554907-69.028659a18.319708 18.319708 0 0 0-10.845267-31.363339z" fill="#FED150" p-id="2286"></path><path d="M928.699854 224.674509l4.250173-17.147247a18.026592 18.026592 0 0 0-5.715749-17.000689l-74.451293-66.097505a18.026592 18.026592 0 0 0-4.103614 29.311532l78.554907 69.028659a14.655766 14.655766 0 0 1 1.465576 1.90525zM1211.263028 124.575625L1137.104851 190.526573a18.026592 18.026592 0 0 0-5.715749 17.733478l4.103614 17.293804 1.612135-1.758692 78.554907-69.028659a18.319708 18.319708 0 0 0-4.39673-30.190879zM1150.588155 320.376662a17.880035 17.880035 0 0 1-22.56988 3.663942L1040.816466 272.89198a18.319708 18.319708 0 0 0-18.17315 0l-86.908694 51.148624a17.733477 17.733477 0 0 1-22.423322-3.810499L908.91457 337.084236a18.026592 18.026592 0 0 0 26.673495 19.638727l86.908693-51.002067a17.586919 17.586919 0 0 1 18.173151 0L1128.751064 357.162636A18.026592 18.026592 0 0 0 1154.69177 337.084236z" fill="#FED150" opacity=".5" p-id="2287"></path><path d="M869.490559 544.463328a42.501722 42.501722 0 0 0-25.06136-73.278831L601.143479 448.321502a42.208607 42.208607 0 0 1-34.880724-25.794149l-86.762136-211.043034a41.622376 41.622376 0 0 0-77.235888 0l-86.469021 211.043034a41.182703 41.182703 0 0 1-34.734166 25.794149L37.922382 471.331055a41.915491 41.915491 0 0 0-23.595784 73.278831l183.050521 161.213429a42.062049 42.062049 0 0 1 13.336747 41.182703L155.608185 971.97203a42.062049 42.062049 0 0 0 61.993891 46.019106l190.524961-112.116612c71.227024-56.4247 69.468332-125.160244 56.717816-147.583566-14.655766-25.354476-34.294493-36.199743-52.760759-26.673495s-19.638727 18.319708-19.638727 18.319708a34.734166 34.734166 0 1 1 34.294493 60.381757s-40.303357 25.06136-67.416524-22.862995 18.612823-83.39131 28.432186-88.813944a83.537868 83.537868 0 0 1 112.995958 39.424011c27.845956 49.096817 16.414458 112.995958-28.432187 166.489505l193.163 113.435631a41.915491 41.915491 0 0 0 61.993891-46.019106l-54.372893-225.552243a41.915491 41.915491 0 0 1 13.19019-41.182703z" fill="#FED150" p-id="2288"></path><path d="M205.43779 713.590871l5.276076-24.768245a41.768934 41.768934 0 0 0-13.336747-41.036146L14.912829 487.012725A8.295164 8.295164 0 0 1 11.542003 483.641898 42.355164 42.355164 0 0 0 14.912829 544.463328l183.05052 161.213429a43.967299 43.967299 0 0 1 7.474441 7.914114zM871.542366 484.81436l-2.051807 2.198365-183.197078 161.213428a41.768934 41.768934 0 0 0-13.19019 41.036146l6.008864 24.621687a42.64828 42.64828 0 0 1 7.181326-8.353787l183.197078-161.213428a42.355164 42.355164 0 0 0 2.051807-59.502411zM460.887796 840.802922a41.622376 41.622376 0 0 0-40.596473 0.732788l-202.689247 119.15138a41.622376 41.622376 0 0 1-55.985027-13.19019l-6.008864 24.47513a42.062049 42.062049 0 0 0 61.993891 46.019106l190.524961-112.116612a173.524272 173.524272 0 0 0 52.760759-65.071602zM727.476184 971.97203l-5.862307-24.328572a41.622376 41.622376 0 0 1-56.131584 13.043632l-166.049832-97.607403a203.275478 203.275478 0 0 1-27.113168 41.475818l193.163 113.435631a41.915491 41.915491 0 0 0 61.993891-46.019106z" fill="#FED150" opacity=".5" p-id="2289"></path></svg>
          <i class="cursor-pointer iconfont icon-dianzan  text-xl md:text-2xl hvr-grow-shadow" :class="like.like ? 'text-blue-800' : ''"></i></div>
          <div @click='unlikeIt' style="transform: rotate(180deg)" title="😭"><i class="cursor-pointer iconfont icon-dianzan text-xl md:text-2xl hvr-grow" :class="like.unlike ? 'text-red-600' : ''"></i></div>
          <div @click="collectionIt" title="去吃灰📦"><i class="cursor-pointer iconfont icon-shoucang1 hover:text-yellow-400 text-xl md:text-2xl hvr-grow-shadow" :class="like.collection ? 'text-yellow-400' : ''"></i></div>
        </div>
        <button class="editBtn learn-more ml-2 text-xs md:text-base cursor-pointer" @click="go_up_article(article)" v-if="article.userId == $store.state.userInfo.userInfo.id">
             <svg t="1657293342548" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2250" width="18" height="18"><path d="M652.4 156.6125a112.5 112.5 0 1 1 155.925 161.15625L731.375 394.71875 572.3 235.5875l79.5375-79.5375 0.5625 0.5625zM333.63125 792.40625v0.1125H174.5v-159.1875l358.03125-357.975 159.075 159.13125-357.975 357.91875zM62 849.5h900v112.5H62v-112.5z" fill="#7e97b8" p-id="2251"></path></svg>
              修改博客
        </button>
      </div>
    </div>
    <!-- 评论区 -->
    <aside
      class="w-full px-3 lg:w-3/5 md:mt-14 mt-5 mx-auto border-4 border-light-blue-500 border-opacity-100 bg-white shadow-2xl rounded-t-3xl">
      <div class="w-full text-xs flex justify-between pt-5" style='color:#999999'>
        <span>最新评论（{{comment.length}}）</span>
        <span class=" cursor-pointer">
          <Icon type="menu" />按时间
        </span>
      </div>
      <!-- 输入框 -->
     <div class="py-3 flex justify-between">
       <div class=" w-12">
         <div :style="{backgroundImage:`url(${$store.state.userInfo.userInfo.avatarUrl})`,backgroundSize:'100% 100%'}" class=" w-7 h-7 rounded-full"></div>
       </div>
       <form class="flex-1 relative" v-on:submit.prevent>
         <input type="text" v-model="commentContent" placeholder="发一条友善的评论" class="focus:outline-none focus:ring focus:border-blue-300 border-none w-full h-8 md:h-12 bg-gray-100 rounded py-1 px-2 box-border text-0a1 md:text-sm text-xs block">
        <p class="text-red-500 text-sm twinkle" v-if="is_commentContent && !commentContent">**请输入内容</p>
        <div class="mt-3 flex justify-between">
          <div @click="(e)=>{this.showexpression = true;e.stopPropagation();return false}" type='button' class="text-sm px-2 border border-solid border-gray-300 rounded cursor-pointer bg-white text-061 text-opacity-80 outline-none h-6 flex items-center">
            <Icon type='smile' class='mr-1'/>
            <span>表情</span>
          </div>
          <button @click="PutComment" type="submit" class="text-sm text-white outline-none px-2 rounded h-6 w-17 cursor-pointer " style="background:#fb7299;border: 1px solid #fb7299">
            发布
          </button>
         </div>
         <!-- 表情 -->
        <div @click="(e)=>{e.stopPropagation()}" v-if="showexpression" class="absolute md:-bottom-60 -bottom-42 bg-white z-100 md:w-86 md:h-60  w-56 h-42 rounded border border-solid border-gray-300 shadow-md ">
          <p class='pt-1 pb-2 m-0 h-1/6 text-xs'>小表情</p>
          <div class="w-full h-2/3 flex justify-around flex-wrap overflow-auto bg-white z-999">
             <div  v-for="i in BiLiEmailTotal" :key="i" class="md:w-14 md:h-10 w-9 h-6 flex justify-center items-center">
               <img :src="'http://47.107.243.60:5005/img/BiLiEmail/'+ BiLiEmaili + i +'.png'" alt="" class="md:w-7 w-5 md:h-7 h-5" @click="inputexpression(BiLiEmaili + i)">
             </div>
          </div>
          <div class="w-full h-1/6 bg-gray-300 flex justify-start">
            <div @click="(e)=>{BiLiEmaili = 'Default/default0';BiLiEmailTotal = 80;e.stopPropagation()}" class="h-full w-1/5 flex justify-center items-center" :class="BiLiEmaili == 'Default/default0' ? 'bg-white' : ''" style="border-right:solid #CCC 1px">
               <img src="http://47.107.243.60:5005/img/BiLiEmail/Default/default01.png" alt="" class="md:w-7 w-5 md:h-7 h-5">
            </div>
            <div @click="(e)=>{BiLiEmaili = 'BiLiTV/BiLITV_';BiLiEmailTotal = 5;e.stopPropagation()}" class="h-full w-1/5  flex justify-center items-center" :class="BiLiEmaili == 'BiLiTV/BiLITV_' ? 'bg-white' : ''"  style="border-right:solid #CCC 1px">
               <img :src="'http://47.107.243.60:5005/img/BiLiEmail/BiLiTV/BiLITV_1.png'" alt="" class="md:w-7 w-5 md:h-7 h-5">
            </div>
          </div>
          </div>
        </form>
      </div>
      <!-- 评论展示区 -->
      <section >
        <div class="w-full pb-3 pl-10 relative" v-for="(i, index) in comment" :key="index">
          <div class=" absolute left-0">
            <img :src="i.avatarUrl" alt="" class=" w-10 h-10 rounded-full">
          </div>
          <div class="md:px-4 px-2" style="border-bottom:solid #e5e7eb 1px">
            <p class="text-sm"><span>{{ i.nickname }}</span><span class="text-xs inline-block ml-2">{{formatCommentTime(i.commentTime)}}</span></p>
            <p class="text-0a1" v-html="i.comment"></p>
            <div class='w-full flex justify-between text-0a1 opacity-60 items-center'>
              <div class="w-1/3 md:w-28 flex justify-between ">
                <Icon type="like" title="点赞" class="hover:text-pink-400 cursor-pointer" />
                <Icon type="dislike" title='点踩' class="hover:opacity-100 cursor-pointer" />
                <Icon type="message" title="评论" class="hover:text-blue-400 cursor-pointer" />
              </div>
              <!-- $set给没再data中定义的数据添加响应式 -->
              <div class="relative cursor-pointer" @click="() => {
                if (deleteVisi.r == index) {
                  deleteVisi.r = null
                  return
                }
                $set(deleteVisi, 'r', index)
              }">
                <Icon type="more" />
                <div @click='deleteComment(i.userId,i.commentId)' v-if="deleteVisi.r == index"
                  class="absolute -top-5 -left-10 w-10 text-center shadow-md border border-solid border-gray-200 text-xs cursor-pointer hover:text-blue-500">
                  <Icon type="delete" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <!-- 无评论时 -->
      <Empty v-if='comment.length == 0'
        image="https://s1.hdslb.com/bfs/static/laputa-search/client/assets/empty.3709c24c.png" :image-style="{
          height: '200px',
        }">
        <span slot="description"> 🤡 </span>
      </Empty>
    </aside>
  </div>
</template>

<script>
import { Tooltip,Icon,Empty } from "ant-design-vue";
import QRCode from 'qrcodejs2'
import {putComment,getComment,deleteComment,changeLike} from '../../api/comment'
import { Get_Article_Content } from '../../api/article_list'
export default {
  name: "article_detail",
  components: {
    Tooltip,
    Icon,
    Empty
  },
  data() {
    return {
      article: {
        commenter: []
      },
      comment: [],
      tip: "您时刻都在关注您自己！😁",
      count: 0,
      commentContent: '',//内容
      showexpression: false,//小表情展示框判断变量
      BiLiEmaili: 'Default/default0',//表情地址
      BiLiEmailTotal: 80,//该系列表情数量,
      is_commentContent: false,
      deleteVisi: {},//删除按钮
      sendtext:true,
      shoeqrcode:false,
      sharehref : window.location.href,
      like:{
        like:false,
        unlike:false,
        collection:false
      },
      special:false //点赞特效
    };
  },
  methods: {
    async likeIt(){
      if (!JSON.parse(localStorage.getItem("userInfo")).id){// 未登录
        this.noLogin()
        return
      }
      if(!this.like.like && !this.like.unlike){
        this.special = true
        this.like.like = true
        clearTimeout(this.specialTimer)
        this.specialTimer = setTimeout(()=>{
          this.special = false
        },1000)
      }
      else if(!this.like.like && this.like.unlike){
        this.like.like = true
        this.like.unlike = false
      }
      else{
        this.like.like = false
      }
      await changeLike({
        uper: this.$route.params.userId ? this.$route.params.userId : JSON.parse(localStorage.getItem('article_details')).userId,
        article_id: this.$route.params.id,
        userId: this.$store.state.userInfo.userInfo.id,
        ...this.like
      })
    },
    async unlikeIt(){
      if (!JSON.parse(localStorage.getItem("userInfo")).id){// 未登录
        this.noLogin()
        return
      }
      if(!this.like.like && !this.like.unlike){
        this.like.unlike = true
      }
      else if(!this.like.unlike && this.like.like){
        this.like.unlike = true
        this.like.like = false
      }
      else{
        this.like.unlike = false
      }
      await changeLike({
        uper: this.$route.params.userId ? this.$route.params.userId : JSON.parse(localStorage.getItem('article_details')).userId,
        article_id: this.$route.params.id,
        userId: this.$store.state.userInfo.userInfo.id,
        ...this.like
      })
    },
    async collectionIt(){
      if (!JSON.parse(localStorage.getItem("userInfo")).id){// 未登录
        this.noLogin()
        return
      }
      this.like.collection = !this.like.collection
      await changeLike({
        uper: this.$route.params.userId ? this.$route.params.userId : JSON.parse(localStorage.getItem('article_details')).userId,
        article_id: this.$route.params.id,
        userId: this.$store.state.userInfo.userInfo.id,
        ...this.like
      })
    },
    shareSpace(val){
      const title = this.article.article_title
      const summary = this.article.article_introduction
      const href = `https://sns.qzone.qq.com/cgi-bin/qzshare/cgi_qzshare_onekey?url=${this.sharehref}&sharesource=qzone&title=${title}&pics=http://47.107.243.60:5005/img/static_img/share.jpg&summary=${summary}`
      if(val == 'qq'){
        var p = {
            url:this.sharehref,/*获取URL，可加上来自分享到QQ标识，方便统计*/
            // desc, /*分享理由(风格应模拟用户对话),支持多分享语随机展现（使用|分隔）*/
            title,/*分享标题(可选)*/
            summary : 'title',/*分享描述(可选)*/
            pics : 'http://47.107.243.60:5005/img/static_img/home_banner.png',/*分享图片(可选)*/
            flash : '', /*视频地址(可选)*/
            //commonClient : true, /*客户端嵌入标志*/
            site: 'QQ分享'/*分享来源 (可选) ，如：QQ分享*/
        };
        var s = [];
        for (var i in p) {
            s.push(i + '=' + encodeURIComponent(p[i] || ''));
        }
        var target_url = "http://connect.qq.com/widget/shareqq/iframe_index.html?" + s.join('&') ;
        window.open(target_url, 'qq', 'height=520, width=720');
    }
    if(val == 'kj'){
      window.open(href, 'kj', 'height=520, width=720')
    }
    },
    // 微信分享二维码
    createQrcode(){
       let text = this.href
      // let qrcode =
       new QRCode(this.$refs.qrcode, {
        text: text, //二维码内容字符串
        width: 108, //图像宽度
        height: 108, //图像高度
        colorDark: '#000000', //二维码前景色
        colorLight: '#ffffff', //二维码背景色
        correctLevel: QRCode.CorrectLevel.H, //容错级别
      })
      // console.log(qrcode);
    },
    // 格式化评论
    formatComment(comment) {
     if(!comment) return
      if (comment.indexOf('@') >= 0) {
        let a = comment.match(/(?<=@).*?(?=!)/g)
        for (let i = 0; i < a.length; i++) {
          comment = comment.replace('@' + a[i] + '!', `<img src='http://47.107.243.60:5005/img/BiLiEmail/${a[i]}.png' class='w-6 h-6'/>`)
      }
    }
    return comment
    },
    formatCommentTime(commentTime){
      if(commentTime.indexOf('AM') > -1){
        commentTime = commentTime.replace('AM','')
      }else{
        commentTime = new Date(Date.parse(commentTime)).toLocaleString()
      }
      return commentTime
    },
    followsAuthor() {
      this.count++;
      if (this.article.userId == this.$store.state.userInfo.userInfo.id) {
        if (this.count > 10) {
          this.tip = "别调皮😤";
        }
        return;
      }
    },
    // 输入表情处理
    inputexpression(expression_val) {
      this.commentContent += '@' + expression_val + '!'
    },
    //发布评论
    PutComment() {
      if (!JSON.parse(localStorage.getItem("userInfo")).id){// 未登录
        this.noLogin()
        return
      }
      if (!this.commentContent) {
        this.is_commentContent = true
        return
      }
      this.sendtext = false
      let req = {
        uper: this.$route.params.userId ? this.$route.params.userId : JSON.parse(localStorage.getItem('article_details')).userId,
        article_id: this.$route.params.id,
        userId: this.$store.state.userInfo.userInfo.id,
        comment: this.commentContent,
      }
      this.is_commentContent = false
      this.commentContent = ''
      putComment(req).then(async () => {
        this.miniMessage('评论成功🥰', 'success')
        delete req.comment
        // 更新评论
        this.getComments(req)
        this.sendtext = true
      })
    },
    // 获取最新评论
    async getComments(req) {
      const res = await getComment(req)
      let arr = []
      res.data.commenter.forEach(i => {
        for (let index = 0; index < i.comment.length; index++) {
          const comment = this.formatComment(i.comment[index].content)
          const {commentTime,commentId} = i.comment[index]
          arr.push({ comment,userId:i.userId, avatarUrl: i.avatarUrl, nickname: i.nickname,commentTime,commentId })
          arr.sort((a,b)=>{
            return Date.parse(b.commentTime) - Date.parse(a.commentTime)
          })
        }
      })
      this.comment = arr
    },
    // 删除评论
    async deleteComment(userId,commentId) {
      if (!JSON.parse(localStorage.getItem("userInfo")).id){// 未登录
        this.noLogin()
        return
      }
      if(userId !== JSON.parse(localStorage.getItem('userInfo')).id){
        this.miniMessage("<div class='text-sm'>你不能删除这条评论！</div>",'error')
        return
      }
      let req = {
        uper: this.$route.params.userId ? this.$route.params.userId : JSON.parse(localStorage.getItem('article_details')).userId,
        article_id: this.$route.params.id,
        userId,
        commentId
      }
      await deleteComment(req)
      this.getComments(req)
      this.miniMessage('删除成功👌', 'success')
    },
  },
  async created() {
    this.$store.commit('change_isfixed',0)
    // if(this.$route.params.content){
    //   this.article = this.$route.params
    // }
    // else if(JSON.parse(localStorage.getItem("article_details")) && JSON.parse(localStorage.getItem("article_details")).content){
    //   this.article = JSON.parse(localStorage.getItem("article_details"))
    // }else{
      // 分享时无缓存，读指定某条文章内容
      const res = await Get_Article_Content(this.$route.fullPath.split('/')[2])
      this.article =  res.data.article
    // }
    try {
      let {like,unlike,collection} = this.article.commenter.find(i=>i.userId == this.$store.state.userInfo.userInfo.id)
      this.like.like = like;this.like.unlike = unlike;this.like.collection = collection
    } catch (error) {error}
    localStorage.setItem("article_details", JSON.stringify(this.article));
    const req = {
      uper: this.$route.params.userId ? this.$route.params.userId : JSON.parse(localStorage.getItem('article_details')).userId,
      article_id: this.$route.params.id,
    }
    this.getComments(req)

    //页面标题为文章标题
    document.title  = this.article.article_title
  },
  mounted() {
    // 代码块内容复制
    const pre = document.getElementsByTagName("pre");
    // 给伪元素添加事件，采用事件冒泡的机制实现
    Array.from(pre).forEach((item) => {
      item.children[0].onclick = (e) => {
        e.stopPropagation();
          console.log(123);
        return;
      };
      item.addEventListener(
        "click",
        () => {
          console.log(123);
          const content = item.children[0].innerText;
          navigator.clipboard
            .writeText(content)
            .then(() => {
              this.miniMessage('复制成功🥰', 'success')
            })
            .catch(() => { });
        },
        false
      );
    });
  },
  beforeRouteLeave(to,from,next){
    if(to.meta.title !== '写博客'){
      localStorage.removeItem('article_details')
    }
    next()
  }
};
</script>

<style lang="less" >
@font-face {
  font-family: firaCode;
  src: url("../../assets/font/FiraCode-Bold-5.ttf") format("truetype")
}

pre {
  background-color: #CCC;
  display: flex;
  justify-content: space-between;
  color: rgb(140, 119, 119);
  code{
  font-family:'firaCode';
  font-size: 14px;
  }
  &::after {
    content: "";
    width: 20px;
    height: 20px;
    background-image: url(http://img1.3png.com/81c41e9a6ac6aefdef1845b4d9bc2b994130.png);
    background-size: 100% 100%;
    color: rgb(190, 179, 179);
    cursor: pointer;
  }
  &::-webkit-scrollbar{/*滚动条整体样式*/
      width: 3px;     /*高宽分别对应横竖滚动条的尺寸*/
      height: 7px;
  }
  &::-webkit-scrollbar-thumb {/*滚动条里面小方块*/
      border-radius: 10px;
      -webkit-box-shadow: inset 0 0 5px rgba(0,0,0,0.2);
      background:rgb(192, 224, 232)
  }
  &::-webkit-scrollbar-track {/*滚动条里面轨道*/
      -webkit-box-shadow: inset 0 0 5px rgba(0,0,0,0.2);
      border-radius: 10px;
      background: #ffffff;
  }
}

.h {
  img {
    width: 100%;
  }
}

/* From uiverse.io */
.follows {
  font-family: inherit;
  font-weight: 700;
  padding: 4px;
  border-radius: 20px;
  border: none;
  cursor: pointer;
  color: black;
  box-shadow: rgba(0, 0, 0, 0.1) 0px 20px 25px -5px,
    rgba(0, 0, 0, 0.04) 0px 10px 10px -5px;
  background: linear-gradient(0deg,
      #df5e88,
      rgba(0, 91, 187, 1) 47%,
      rgba(0, 91, 187, 1) 100%);
}

.follows .button-content {
  display: flex;
  align-items: center;
  background: white;
  padding: 0.2em 0.9em;
  // padding-left: 1.2em;
  border-radius: 16px;
}

.follows svg {
  width: 18px;
  height: 18px;
  margin-left: 6px;
  color: #ff0000;
  transition: transform 0.3s;
}

.follows:hover svg {
  transform: scale(1.2);
}


input {
  transition: 0.5s;
}

input:focus {
  height: 60px;
}

// 文字闪烁
.twinkle {
  animation: twinkle 0.5s linear 3;
}

@-webkit-keyframes twinkle {
  0% {
    opacity: 1;
  }

  50% {
    opacity: 1;
  }

  50.1% {
    opacity: 0;
  }

  100% {
    opacity: 0;
  }
}
/* From uiverse.io by @mrhyddenn */
</style>
<style>
/* From uiverse.io by @mrhyddenn */
.mover {
  background: rgba(56, 111, 173, 0.979);
  height: 2px;
  width: 10px;
  border-radius: 10px;
  position: relative;
  animation: mover5 2s ease-in-out infinite;
}

.mover::before,
.mover::after {
  content: '';
  position: absolute;
  height: 2px;
  width: 10px;
  border-radius: 10px;
  animation: mover5 2s ease-in-out infinite;
}

.mover::before {
  background: rgb(105, 188, 236);
  top: 4px;
}

.mover::after {
  background: rgb(116, 201, 226);
  top: -4px;
}

@keyframes mover5 {
  0% {
    transform: translateX(5px) scale(1);
  }

  50% {
    transform: translateX(-5px) scale(1.2);
  }

  100% {
    transform: translateX(5px) scale(1);
  }
}

/* 修改文章按钮 */
.editBtn {
 display: flex;
 align-items: center;
 justify-content: center;
 gap: 10px;
 font-family: inherit;
 font-size: 13px;
 font-weight: 500;
 text-transform: uppercase;
 letter-spacing: 0.4px;
 color: #7e97b8;
 background-color: #e0e8ef;
 border-style: solid;
 border-width: 2px 2px 2px 2px;
 border-color: rgba(255, 255, 255, 0.333);
 border-radius: 40px 40px 40px 40px;
 padding: 10px 14px 10px 18px;
 transform: translate(0px, 0px) rotate(0deg);
 transition: 0.2s;
 box-shadow: -4px -2px 16px 0px #ffffff, 4px 2px 16px 0px rgb(95 157 231 / 48%);
}

.editBtn:hover {
 color: #335581;
 background-color: #E5EDF5;
 box-shadow: -2px -1px 8px 0px #ffffff, 2px 1px 8px 0px rgb(95 157 231 / 48%);
}

.editBtn:active {
 box-shadow: none;
}
</style>
