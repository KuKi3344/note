package main;
import java.util.*;
public class test1 {
	public static void main(String []args) {
		Scanner n = new Scanner(System.in);
		int num = n.nextInt();
		n.close();
		int[] f = new int[num];
	//	LinkedList<Integer> data_stack = new LinkedList<>();
		if(num == 1 || num == 2) {
			f[num-1] = 1;
		}
		for(int i =2;i<num;i++) {
			f[0] = 1;
			f[1] = 1;
			f[i] = (f[i-1] + f[i-2]) % 10007;
		}
		int k = f[num-1];
		System.out.println(k);
	}
}
