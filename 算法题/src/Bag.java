import java.util.Scanner;

public class Bag {
    public void go(int a,int b,int[] w,int[] v){
        int result = bagvalue(a,b,w,v);
        System.out.println(result);
    }
    public int bagvalue(int a,int b,int[] w,int[] v){
        int result = 0;
        if(a<1||b<1) {
            return 0;
        }else if(w[a]>b){
            result = bagvalue(a-1,b,w,v);
        }else{
            result = Math.max(bagvalue(a-1,b,w,v),bagvalue(a-1,b-w[a],w,v)+v[a]);
        }
        return result;

    }
    public static void main(String []args){
        Bag bag = new Bag();
        Scanner in = new Scanner(System.in);
        System.out.println("第一行请输入物品个数以及背包最大承重，第二行输入每个物品的重量，第三行输入每个物品的价值");
        int a = in.nextInt();
        int b = in.nextInt();
        int []w = new int[a+1];
        int []v = new int[a+1];
        for(int i=1;i<=a;i++){
            w[i] = in.nextInt();
        }
        for(int i=1;i<=a;i++) {
            v[i] = in.nextInt();
        }
        bag.go(a,b,w,v);
    }
}
