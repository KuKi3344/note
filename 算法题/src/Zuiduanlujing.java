public class Zuiduanlujing {
    public int findCheapestPrice(int n, int[][] flights, int src, int dst, int k) {
        int [][]map = new int[n][n];
        int [][]count = new int[n][n];
        for(int i=0;i<n;i++){
            for(int j=0;j<n;j++){
                map[i][j] = Integer.MAX_VALUE;
            }
        }
        for(int i=0;i<flights.length;i++){
            map[flights[i][0]][flights[i][1]] = flights[i][2];
            count[flights[i][0]][flights[i][1]] =1;
        }
        for(int i=0;i<n;i++){
            for(int j=0;j<n;j++){//i = 0,j =2,q = 1; 500 < 100 + 100
                for(int q = 0;q<n;q++){
                    if(map[i][j]<map[i][q]+map[q][j]){
                        break;
                    }else{
                        int num = count[i][q]+count[q][j];//2
                        if(num>k+1){
                            break;
                        }else{
                            map[i][j] = map[i][q]+map[q][j];
                            count[i][j] = count[i][q]+count[q][j];
                        }
                    }
                }
            }
        }
        return map[src][dst]==Integer.MAX_VALUE ? -1:map[src][dst];
    }
    public static void main(String []args){
        Zuiduanlujing z = new Zuiduanlujing();
        int[][] arr = {{0,1,100},{1,2,100},{0,2,500}};
        System.out.println(z.findCheapestPrice(3, arr, 0, 2, 1));
    }
}
