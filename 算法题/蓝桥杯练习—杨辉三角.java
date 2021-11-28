package main;
import java.util.*;
public class test2 {
	public static void main(String []args) {
	Scanner in = new Scanner(System.in);
	int n = in.nextInt();
	in.close();
	int [][]a = new int[n][n];
	for(int i=0;i<n;i++) {
		a[i][0] = a[i][i] = 1;
		for(int k=1;k<i;k++) {
			a[i][k] = a[i-1][k-1]+a[i-1][k];
		}
	}
	for(int i = 0;i<n;i++) {
		for(int j=0;j<=i;j++) {
			System.out.print(a[i][j]+" ");
		}
		System.out.println();
	}
	}
}
