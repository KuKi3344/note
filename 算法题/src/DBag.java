import java.util.*;
public class DBag {
    public static void main(String []args){
        Scanner in = new Scanner(System.in);
        System.out.println("动态规划方法：");
        System.out.println("第一行请输入物品个数以及背包最大承重，第二行输入每个物品的重量，第三行输入每个物品的价值");
        int a = in.nextInt();
        int b = in.nextInt();
        int []w = new int[a+1];
        int []v = new int[a+1];
        int [][]f = new int[a+1][b+1];
        for(int i=1;i<=a;i++){
            w[i] = in.nextInt();
        }
        for(int i=1;i<=a;i++) {
            v[i] = in.nextInt();
        }
        for(int i=1;i<=a;i++){
            f[i][0] = 0;
            for(int j=1;j<=b;j++){
                if(w[i]>j){
                    f[i][j] = f[i-1][j];
                }else{
                    f[i][j] = Math.max(f[i-1][j],f[i-1][j-w[i]]+v[i]);
                }
            }
        }
        System.out.println(f[a][b]);
    }
}
