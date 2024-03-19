import {Component, HostListener, ViewChild} from '@angular/core';
import {RequestArtwork} from "../../../_model/request-artwork.model";
import {NgForm} from "@angular/forms";
import {ArtworkService} from "../../../_services/artwork.service";
import {Genre} from "../../../_model/genre.model";
import {ToastrService} from "ngx-toastr";
import {ValidationService} from "../../../_services/validation.service";
import {CommissionService} from "../../../_services/commission.service";
import {ActivatedRoute, Router} from "@angular/router";
import {UserProfile} from "../../../_model/userProfile.model";

@Component({
  selector: 'app-request-artwork',
  templateUrl: './request-artwork.component.html',
  styleUrls: ['./request-artwork.component.css']
})
export class RequestArtworkComponent {
  userProfile: UserProfile | undefined;
  requestArtwork: RequestArtwork = new class implements RequestArtwork {
    genreId: number;
    maxPrice: number;
    minPrice: number;
    receiverId: number;
    requestDescription: string;
  }
  validationErrors: string[] = [];
  @ViewChild('requestForm') requestForm: NgForm | undefined;
  genres: Genre[] = [];
  genreSelected: number;

  @HostListener('window:beforeunload', ['$event']) unloadNotification($event: any) {
    if (this.requestForm?.dirty) {
      $event.returnValue = true;
    }
  }

  constructor(private artworkService: ArtworkService,
              private toastrService: ToastrService,
              private validationService: ValidationService,
              private commissionService: CommissionService,
              private router: Router,
              private route: ActivatedRoute) {
    this.artworkService.getGenreForArtwork().subscribe({
      next: genres => {
        this.genres = genres;
      }
    });
    this.route.data.subscribe({
      next: data => {
        this.userProfile = data['userProfile'];
        console.log(this.userProfile)
      }
    });
  }
  request() {
    this.requestArtwork.genreId = this.genreSelected;
    if (!this.validationService.minPriceValidation(this.requestArtwork.minPrice)) {
      this.toastrService.error("The min price must be bigger than 0.");
    }
    if (!this.validationService.maxPriceValidation(this.requestArtwork.maxPrice, this.requestArtwork.minPrice)) {
      this.toastrService.error("The max price must be smaller than 1.000.000.000VNĐ and larger than the min price.");
    }
    this.commissionService.addCommission(this.requestArtwork).subscribe(response => {
      console.log(response)
      this.toastrService.success('Your request has just sent, please check My PreOrder.');
      this.router.navigate(['/']);
    })
    console.log(this.requestArtwork)
  }
}
