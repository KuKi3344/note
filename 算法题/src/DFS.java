import java.util.Scanner;

public class DFS {

    public int[][] visit = new int[4][4];

    public int startx = 1;
    public int starty = 1;

    public int p = 3;
    public int q = 3;

    public int min = Integer.MAX_VALUE;

    public int solution(int[][] arr) {
        visit[1][1] = 1;
        dfs(startx,starty,0, arr);

        return min;
    }

    public void dfs(int m, int n, int step, int[][] arr){
        if(m == p && n == q){
            min = Math.min(min,step);
            return;
        }
        //往右走
        if(n+1<=q&&arr[m][n+1] == 0 && visit[m][n+1] ==0){
            visit[m][n+1] = 1;
            dfs(m,n+1,step+1, arr);
            visit[m][n+1] = 0;
        }
        //往左走
        if(n-1>=1&&arr[m][n-1] == 0 && visit[m][n-1] ==0){
            visit[m][n-1] = 1;
            dfs(m,n-1,step+1, arr);
            visit[m][n-1] = 0;
        }
        //往下走
        if(m+1<=p&&arr[m+1][n] == 0 && visit[m+1][n] ==0){
            visit[m+1][n] = 1;
            dfs(m+1,n,step+1, arr);
            visit[m+1][n] = 0;
        }
        //往上走
        if(m-1>=1&&arr[m-1][n] == 0 && visit[m-1][n] ==0){
            visit[m-1][n] = 1;
            dfs(m-1,n,step+1, arr);
            visit[m-1][n] = 0;
        }
    }
    public static void main(String[] args){

        Scanner s = new Scanner(System.in);

        int[][] arr = new int [4][4];
        for(int i = 1; i < 4; i++){
            for(int j = 1; j < 4; j++){
                arr[i][j] = s.nextInt();
            }
        }

        s.close();

        DFS d = new DFS();
        int solution = d.solution(arr);

        System.out.println(solution);
    }
}
