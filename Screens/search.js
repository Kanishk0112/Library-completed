import React from "react"
import{Text,View,FlatList, TextInput,TouchableOpacity,StyleSheet} from "react-native"
import db from '../Config'
import { ScrollView} from 'react-native-gesture-handler'
export default class Searchscreen extends React.Component{
    constructor(props){
        super(props)
        this.state={
            alltransactions:[],
            search:"",
            lastvisibletransaction:null
        }
    }
    componentDidMount= async()=>{
        const query= await db.collection("transactions").get()
        query.docs.map((doc)=>{
            this.setState({alltransactions:[...this.state.alltransactions,doc.data()]})
        })
    }
    fetchmoretransactions= async()=>{
        var text=this.state.search.toUpperCase()
        var enteredtext=text.split("")
        if(enteredtext[0].toUpperCase()==="B"){
            const query=await db.collection("transactions").where("bookid","==",text).startAfter(this.state.lastvisibletransaction)
            .limit(10).get()
            query.docs.map((doc)=>{
                this.setState({
                    alltransactions:[...this.state.alltransactions,doc.data()],lastvisibletransaction:doc  
                })
            })
        }
        else if(enteredtext[0].toUpperCase()==="S"){
            const query=await db.collection("transactions").where("Studentid","==",text).startAfter(this.state.lastvisibletransaction)
            .limit(10).get()
            query.docs.map((doc)=>{
                this.setState({
                    alltransactions:[...this.state.alltransactions,doc.data()],lastvisibletransaction:doc  
                })
            })
        }
    }
    searchtransactions= async(text)=>{
        var enteredtext=text.split("")
        if(enteredtext[0].toUpperCase()==="B"){
            const transaction=await db.collection("transactions").where("bookid","==",text). get()
                      transaction.docs.map((doc)=>{
                this.setState({
                    alltransactions:[...this.state.alltransactions,doc.data()],lastvisibletransaction:doc  
                })
            })
        }
        else if(enteredtext[0].toUpperCase()==="S"){
            const transaction=await db.collection("transactions").where("Studentid","==",text).get()
            transaction.docs.map((doc)=>{
                this.setState({
                    alltransactions:[...this.state.alltransactions,doc.data()],lastvisibletransaction:doc  
                })
            })
        }
    }
    render(){
        return(
            <View style={styles.container}>
                <View style={styles.searchBar}>
                <TextInput style={styles.bar}
                    placeholder="Enter Bookid or Studentid"
                    onChangeText={(text)=>{this.setState({search:text})}}
                    />
                    <TouchableOpacity style={styles.searchButton} onPress={()=>{this.searchtransactions (this.state.search)}}>
                        <Text>
                            Search
                            </Text>
                            </TouchableOpacity>
            </View>
            <FlatList
            data={this.state.alltransactions}
                renderItem={({item})=>{
                    <View style={{borderBottomWidth:2}}>                     
                    <Text>{"bookid:"+item.bookid}</Text>
                    <Text>{"Studentid:"+ item.Studentid}</Text>
                    <Text>{"transactiontype:"+ item.transactionType}</Text>
                    <Text>{"date:"+ item.date.toDate()}</Text>
                </View>
                }}
               keyExtractor={(item,index)=>index.toString()}
               onEndReached={this.fetchmoretransactions}
               onEndReachedThreshold={0.7}
                             />
                             </View>
           
        )
    }
}

const styles = StyleSheet.create({ container: { flex: 1, marginTop: 20 },
     searchBar:{ flexDirection:'row', height:40, width:'auto', borderWidth:0.5,
      alignItems:'center', backgroundColor:'grey', },
       bar:{ borderWidth:2, height:30, width:300, paddingLeft:10, },
        searchButton:{ borderWidth:1, height:30, width:50, alignItems:'center', justifyContent:'center', backgroundColor:'green' } })