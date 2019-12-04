//calculate the cosine distance between two user
//input: A: data for user A, B: data for user B
function calc_eu_dist(A,B){
    let temp_a = A[0]-B[0]
    let temp_b = A[1]-B[1]
    let diff = temp_a*temp_a + temp_b*temp_b;
    // console.log(temp_a, temp_b)
    diff = Math.sqrt(diff);
    return diff;
}

//recommand user I do not know yet
// input: query data: object, data in data_base: list of object, weight: object
// output: top 3 recommended player
// object attribute: rank score, Favorite position, rating
function recommand(input_data, data_base, max_score){
    let sim = new Array();
    let arr = new Array();
    var total_count = 0;
    const query_id = input_data.id;
    const query_score = 5 * input_data.score /  max_score;
    const query_pos = input_data.position;
    for(i = 0; i < data_base.length; i++){
        let temp = data_base[i]
        //calculate the eucidean similarity distance
        // add weight later
        if(query_id == temp.id){
            continue;
        }
        let vec_A = [query_score, query_pos]
        let vec_B = [5*temp.score/max_score, temp.position]
        console.log("id :",temp.id)
        let diff = calc_eu_dist(vec_A, vec_B)
        console.log(" diff :", diff)
        if(diff < 0.4){
                total_count += 1;
                let dum2 = sim.push(1 - diff);
                let dddddm = arr.push(temp)
        }
    }
    // console.log(arr.length)
    //build a sparse mtx
    var dict = {}
    var user_idx = new Array()
    for(i = 0; i < total_count; i++){
        let list_i = arr[i].friend_list
        console.log("user id: ", arr[i].id)
        console.log(list_i)
        for(j = 0; j < list_i.length; j ++){
            let temp_user = list_i[j].user_id
            // console.log("friend id: ", temp_user)
            if(temp_user == query_id){
                continue;
            }
            //check if it is exist in dictionary
            let temp_obj = [sim[i], list_i[j].rating] //weighted rating
            if(temp_user in dict){
                let dum_x = dict[temp_user].push(temp_obj)
                // let dumx = dict[temp_user]
            }
            else{
                // console.log("here")
                let t_arr = new Array();
                let dum_i = t_arr.push(temp_obj)
                dict[temp_user] = t_arr
                // let dum_i = dict[temp_user].push(temp_obj)

                let dummmm = user_idx.push(temp_user)
            }
        }
    }
    console.log(user_idx)

    //recommand the player who I do not know yet
    let temp_ret_list = new Array();
    let my_friend_list = new Array();
    for(i = 0; i < input_data.my_friend_list; i++){
        let dmy = my_friend_list.push(input_data.friend_list[i].user_id)
    }
    for(i = 0; i < user_idx.length; i++){
        if(user_idx[i] in my_friend_list){// i have already known this user
            continue;
        }
        let data_list = dict[user_idx[i]]
        let temp_sum = 0
        let temp_weight_sum = 0
        for(j = 0; j < data_list.length; j++){
            temp_obj = data_list[j]
            temp_sum += temp_obj[0]*temp_obj[1]
            temp_weight_sum += temp_obj[0]
        }
        console.log("temp sum and weight", temp_sum, temp_weight_sum)
        console.log("id: ", user_idx[i])
        let avg_rate = temp_sum/temp_weight_sum
        console.log("rate : ", avg_rate)
        let dummm_t = temp_ret_list.push( [user_idx[i],avg_rate] )
    }
    
    temp_ret_list.sort(function(a,b){return b[1]-a[1]})

    let ret_list = new Array();
    for(i = 0; i < 3 && i < temp_ret_list.length; i++){
        console.log("average rate: ", temp_ret_list[i][1])
        let ret = {
            user_id: temp_ret_list[i][0],
            average_rate: temp_ret_list[i][1]
        }
        let dum_r = ret_list.push(ret)
    }
    return ret_list
}

module.exports = recommand