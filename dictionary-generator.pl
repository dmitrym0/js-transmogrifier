#!/usr/bin/perl -w

use strict;
use Text::Aspell;
use Algorithm::Permute;

my $speller = Text::Aspell->new;

die unless $speller;


# Set some options
$speller->set_option('lang','en_US');
$speller->set_option('sug-mode','fast');


my @array = 'a'..'z';
my $p_iterator = Algorithm::Permute->new ( \@array, 4);

my $dictionary = "";
while (my @perm = $p_iterator->next) {
    my $string = join("", @perm);
    if ($speller->check($string))
    {
        $dictionary .= "'$string', "
    }
}

print "exports.dictionary = [$dictionary];";

