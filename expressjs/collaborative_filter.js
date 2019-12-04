//calculate the cosine distance between two user
//input: A: data for user A, B: data for user B
function calc_eu_dist(A,B, friend_list_A, friend_list_B){
    let temp_a = A[0]-B[0]
    let diff = temp_a*temp_a
    // console.log(temp_a, temp_b)
    diff = Math.sqrt(diff);

    let count = 0;
    let numeritor = 0;
    let norm_A = 0;
    let norm_B = 0;
    // console.log("len:", friend_list_A.length)
    // return 0
    for(let i = 0; i < friend_list_A.length; i++){
        for(let j = 0; j < friend_list_B.length; j++){
            // console.log('i: ', i)
            // console.log(friend_list_A[i].user_id)
            if(friend_list_A[i].user_id == friend_list_B[j].user_id){
                count += 1;
                numeritor += friend_list_A[i].rating*friend_list_B[j].rating
                norm_A += friend_list_A[i].rating*friend_list_A[i].rating
                norm_B += friend_list_B[j].rating*friend_list_B[j].rating
                break
            // let nnnn = 1;
            }
            // let a = 5;
        }
    }
    diff = 1/diff
    if(count < 2){
        if (count == 1){
            diff += 0.05
        }
        else{
            diff += 0.1
        }
    }
    else{
        let temp_cos = numeritor / (Math.sqrt(norm_A) * Math.sqrt(norm_B))
        // console.log("cos: ", temp_cos)
        diff += temp_cos
    }

    return diff;
}

//recommand user I do not know yet
// input: query data: object, data in data_base: list of object, weight: object
// output: top 3 recommended player
// object attribute: rank score, Favorite position, rating
function recommand(input_data, data_base, max_score){
    // console.log("--------------------------------------------------")
    // console.log('input_data')
    // console.log(input_data)
    // console.log("--------------------------------------------------")
    // console.log("--------------------------------------------------")
    // console.log('data_base')
    // console.log(data_base)
    // console.log("--------------------------------------------------")
    // console.log("--------------------------------------------------")
    // console.log('max_score')
    let sim = new Array();
    let arr = new Array();
    var total_count = 0;
    const query_id = input_data.id;
    const query_score = 5 * input_data.score /  max_score;

    // console.log(query_score)
    // console.log("--------------------------------------------------")
    // console.log(max_score)
    // console.log("--------------------------------------------------")

    const query_pos = input_data.position;
    // console.log(data_base.length)
    for(let i = 0; i < data_base.length; i++){
        let temp = data_base[i]
        //calculate the eucidean similarity distance
        // add weight later
        if(query_id == temp.id){
            // console.log("skipped")
            continue;
        }
        // if(query_pos.toUpperCase() !=  temp.position.toUpperCase()){
        //     // console.log(query_pos, " ---- --- --- ---", temp.position)
        //     continue;
        // }
        let vec_A = [query_score, query_pos]
        let vec_B = [5*temp.score/max_score, temp.position]
        console.log("id :",temp.id)
        let similarity = calc_eu_dist(vec_A, vec_B, input_data.friend_list,temp.friend_list)
        // console.log(" @@@@@@@@@@@@@@@@@@ diff :", diff)
        if(query_pos.toUpperCase() !=  temp.position.toUpperCase()){
            // console.log(query_pos, " ---- --- --- ---", temp.position)
            // continue;
            similarity += 0.15
        }
        // if(diff < 0.8){
                total_count += 1;
                let dum2 = sim.push(similarity);
                let dddddm = arr.push(temp)
    // }
    }
	// console.log('-------------------------------------')
    // console.log('arr.length')
    // console.log(arr.length)
	// console.log('-------------------------------------')
    //build a sparse mtx
    var dict = {}
    var user_idx = new Array()
    for(let i = 0; i < total_count; i++){
        let list_i = arr[i].friend_list
        // console.log("user id: ", arr[i].id)
        // console.log(list_i)
        for(let j = 0; j < list_i.length; j ++){
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
    console.log('-----test -----')

    //recommand the player who I do not know yet
    let temp_ret_list = new Array();
    let my_friend_list = new Array();
    for(let i = 0; i < input_data.friend_list.length; i++){
        let dmy = my_friend_list.push(input_data.friend_list[i].user_id)
    }
    // console.log("my_friend_list")
    // console.log(my_friend_list)
    // while (1) {}
    for(let i = 0; i < user_idx.length; i++){
        // if(user_idx[i] in my_friend_list){// i have already known this user
        if(my_friend_list.includes(user_idx[i])){// i have already known this user
            continue;
        }
        let data_list = dict[user_idx[i]]
        let temp_sum = 0
        let temp_weight_sum = 0
        for(let j = 0; j < data_list.length; j++){
            temp_obj = data_list[j]
            temp_sum += temp_obj[0]*temp_obj[1]
            temp_weight_sum += temp_obj[0]
        }
        // console.log("temp sum and weight", temp_sum, temp_weight_sum)
        // console.log("id: ", user_idx[i])
        let avg_rate = temp_sum/temp_weight_sum
        // console.log("rate : ", avg_rate)
        let dummm_t = temp_ret_list.push( [user_idx[i],avg_rate] )
    }
    
    temp_ret_list.sort(function(a,b){return b[1]-a[1]})

    let ret_list = new Array();
    for(i = 0; i < 3 && i < temp_ret_list.length; i++){
        // console.log("average rate: ", temp_ret_list[i][1])
        let ret = {
            user_id: temp_ret_list[i][0],
            average_rate: temp_ret_list[i][1]
        }
        let dum_r = ret_list.push(ret)
    }
    // console.log('ret_list')
    // console.log(ret_list)
    // while (1) {}
    if(ret_list.length == 0){
        // randomly recommend
        let m = 0;

        for(i = 0; i < 3; i++){
            // console.log("average rate: ", temp_ret_list[i][1])
            while(1){
                if(my_friend_list.includes(user_idx[m])){

                    m += 1;
                    continue
                }
                let ret = {
                    user_id: user_idx[m],
                    average_rate: -1
                }
                let sdsds = ret_list.push(ret)
                m += 1
                break
            }
     }

    }
    console.log(ret_list)
    console.log(user_idx)
    console.log("-----finish-------")
    return ret_list
}

module.exports = recommand
