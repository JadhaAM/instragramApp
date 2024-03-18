
 const AllPostScreen=()=>{

    // Function to calculate time elapsed from a post date in React Native
const getTimeElapsed=(postDate) =>{
    const currentDate = new Date();
    const postDateTime = new Date(postDate);

    const timeDifference = currentDate - postDateTime;
    const seconds = Math.floor(timeDifference / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);

    if (days > 0) {
        return days === 1 ? '1 day' : `${days} days`;
    } else if (hours > 0) {
        return hours === 1 ? '1 hour' : `${hours} hours`;
    } else if (minutes > 0) {
        return minutes === 1 ? '1 minute' : `${minutes} minutes`;
    } else {
        return 'just now';
    }
}

const handleLike=(postId)=> {
    fetch(`/like/post/${postId}`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({}),
    }).then((response) => {
        console.log("Response:", response);
        return response.json();
    })
    .then((data) => {
        console.log("Data after like:", data);
        // Your logic to update UI or handle the response
    })
    .catch((error) => {
        console.error("Error liking post:", error);
    });
}


    return (
        <>
        {/* include ./partials/header.ejs */}
      <View style={{ backgroundColor: '#000', paddingTop: 5 }}>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: 4 }}>
          <Image style={{ width: '25%' }} source={require('./images/logo.png')} />
          <View style={{ flexDirection: 'row', marginTop: -2, gap: 5 }}>
            <Image style={{ fontSize: 14 }} source={require('./images/heart.png')} />
            <Image style={{ fontSize: 14 }} source={require('./images/messenger.png')} />
          </View>
        </View>
        <View style={{ flexDirection: 'row', paddingHorizontal: 3, gap: 3, overflow: 'auto', marginTop: 5 }}>
          <View style={{ flexShrink: 0 }}>
            <View
              style={{
                width: '18vw',
                height: '18vw',
                borderRadius: '50%',
                backgroundColor: 'skyblue',
                flexDirection: 'row',
                justifyContent: 'center',
                backgroundImage: 'linear-gradient(to right, purple, orange)',
              }}
            >
              <View style={{ width: '92%', height: '92%', borderRadius: '50%', overflow: 'hidden' }}>
                <Image
                  style={{ width: '100%', height: '100%', resizeMode: 'cover' }}
                  source={{
                    uri:
                      'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?q=80&w=2550&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
                  }}
                />
              </View>
            </View>
          </View>
          {/* Repeat the above code block for the remaining images */}
        </View>
        <View style={styles.postsContainer}>
  {posts.reverse().map((elem) => (
    <View style={styles.postContainer} key={elem._id}>
      <View style={styles.titleContainer}>
        <View style={styles.profileImageContainer}>
          <Image
            style={styles.profileImage}
            source={{ uri: `/images/updates/${elem.user.profileImage}` }}
            alt="postImage"
          />
        </View>
        <Text style={styles.username}>{elem.user.username}</Text>
        <Text style={styles.timestamp}>1d</Text>
      </View>
      <View style={styles.imageContainer}>
        <Image
          style={styles.postImage}
          source={{ uri: `/images/updates/${elem.picture}` }}
          alt="postImage"
        />
      </View>
      <View style={styles.optionsContainer}>
        <View style={styles.iconsContainer}>
          <TouchableOpacity onPress={() => handleLike(elem._id)}>
            {elem.like && elem.like.indexOf(user._id) !== -1 ? (
              <Icon name="ri-heart-3-fill" style={styles.likeIcon} />
            ) : (
              <Icon name="ri-heart-3-line" style={styles.likeIcon} />
            )}
          </TouchableOpacity>
          <Icon name="ri-chat-3-line" style={styles.commentIcon} />
          <Icon name="ri-share-circle-line" style={styles.shareIcon} />
        </View>
        <Icon name="ri-bookmark-line" style={styles.bookmarkIcon} />
      </View>
      <Text style={styles.likesCount}>
        {elem.like ? elem.like.length : 0} likes
      </Text>
      <Text style={styles.caption}>
        <Text style={styles.usernameBold}>{elem.user.username}</Text>
        {elem.caption}
      </Text>
    </View>
  ))}
</View>

      </View>
        </>
    )
 }

 export default AllPostScreen ;