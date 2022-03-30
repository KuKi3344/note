import java.util.Scanner;

public class Bag {
    public int []w = {0,2,3,5,5};
    public int []v = {0,2,4,3,7};
    public void go(){
        int result = bagvalue(4,10);
        System.out.println(result);
    }
    public int bagvalue(int a,int b){
        int result = 0;
        if(a<0||b<0) {
            return 0;
        }else if(w[a]>b){
            result = bagvalue(a-1,b);
        }else{
            result = Math.max(bagvalue(a-1,b),bagvalue(a-1,b-w[a])+v[a]);
        }
        return result;

    }
    public static void main(String []args){
        Bag b = new Bag();
        b.go();
    }
}
