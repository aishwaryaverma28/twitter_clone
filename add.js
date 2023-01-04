let tweetOffset = 0;
let runningCriticalFunction = false;

async function getTweetsAndInsertHTML() {
    if(runningCriticalFunction) {
        return;
    }
    runningCriticalFunction = true;
    const result = await fetch(`https://twitter-backend-6yot.onrender.com/tweet/recent?offset=${tweetOffset}`);

    const tweets = await result.json();

    console.log(tweets.data);

    tweetOffset = tweetOffset + tweets.data.length;

    document.getElementById('tweet-body').insertAdjacentHTML('beforeend', tweets.data.map((tweet) => {
        const date = new Date(tweet.creationDatetime);
        
        return `<div id=${tweet._id} class="tweets">
            <div class="tweet-profile-image">
                <img src="./images/profile.jpg" alt="profile image"/>
            </div>
            <div class="tweet">
            <div class="tweet-header">
                <div class="tweet-user-info">
                    <p><strong>Aishwarya Verma</strong></p>
                    <p>@AishwaryaVerma </p>
                    <p>${date.toDateString()}</p>
                </div>
                <div class="tweet-three-dots-menu">
                    <button data-id=${tweet._id} class="tweet-edit" id="tweet-edit">
                        Edit
                    </button>
                    <button data-id=${tweet._id} class="tweet-delete" id="tweet-delete">
                     Delete
                    </button>
                    <button>
                        <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path
                            fill="#5b7083"
                            d="M16.5 10.25c-.965 0-1.75.787-1.75 1.75s.784 1.75 1.75 1.75c.964 0 1.75-.786 1.75-1.75s-.786-1.75-1.75-1.75zm0 2.5c-.414 0-.75-.336-.75-.75 0-.413.337-.75.75-.75s.75.336.75.75c0 .413-.336.75-.75.75zm-4.5-2.5c-.966 0-1.75.787-1.75 1.75s.785 1.75 1.75 1.75 1.75-.786 1.75-1.75-.784-1.75-1.75-1.75zm0 2.5c-.414 0-.75-.336-.75-.75 0-.413.337-.75.75-.75s.75.336.75.75c0 .413-.336.75-.75.75zm-4.5-2.5c-.965 0-1.75.787-1.75 1.75s.785 1.75 1.75 1.75c.964 0 1.75-.786 1.75-1.75s-.787-1.75-1.75-1.75zm0 2.5c-.414 0-.75-.336-.75-.75 0-.413.337-.75.75-.75s.75.336.75.75c0 .413-.336.75-.75.75z"
                        ></path>
                        </svg>
                    </button>
                </div>
            </div>
            <div class="tweet-body">
                <span id='span-${tweet._id}'>${tweet.title}
                </span>
            </div>
            </div>
        </div>`
    }).join(""))
    runningCriticalFunction = false;
}


window.onload = async () => {
    getTweetsAndInsertHTML();
}

